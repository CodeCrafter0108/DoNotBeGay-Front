'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Absolute, Container, Flex, Line, PageContainer, Text } from '@/styles/global';
import { Box } from '@/components/Box/Box';
import { Input } from '@/components/Input';
import { BoxWrapper, BoxWrapperRow, SupplyBox } from '@/app/styles';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';
import { springToBottom } from '@/common/animations';
import { useLaunchpad } from '@/hooks/useLaunchpad';
import { launchpads } from '@/config/contracts';
import { ChainId, MAX_FILE_SIZE, MAX_INPUT_SYMBOLS } from '@/config/constants';
import { launchpadAbi } from '@/config/abis';
import { useAccount, useBalance, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';
import { Address, bytesToHex, Hash, Hex } from 'viem';
import { DialogType, useDialog } from '@/contexts/DialogContext';
import { countOfSymbolsValidator, websiteValidator } from '@/utils/validators';
import { Info } from '@/app/launcher/components/Info/Info';
import { useIsValidChain } from '@/hooks/useIsValidChain';
import { Show } from '@/components/Show';
import { LAUNCHER_MESSAGES } from '@/config/messages';
import { Loader } from '@/components/Loader';
import { FileUpload } from '@/components/FileUpload';
import { LaunchForm, LaunchFormArgs, LaunchSimulationResult } from './types';
import { config as wagmiConfig } from '@/config/wagmi';
import { apiClient } from '@/config/api';
import { getRandomBytesSync } from 'ethereum-cryptography/random';
import Image from 'next/image';

const CONFIRMATIONS = 1;
const PLACEHOLDER_IMAGE = 'https://placehold.co/200x200';

export default function Launcher() {
    const { address, isConnected, chainId } = useAccount();
    const { showDialog } = useDialog();
    const { switchChain } = useSwitchChain();
    const { writeContract } = useWriteContract();

    const [hash, setHash] = useState<Hash>();
    const [file, setFile] = useState<File>();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState<LaunchForm>({
        name: '',
        symbol: '',
        websiteUrl: '',
        imageUrl: '',
        description: '',
        chatUrl: '',
        socialUrl: '',
        donation: '',
    });

    const randomBytes = useRef<Hex>();
    const { data: isValidChain } = useIsValidChain();
    const { data: balance } = useBalance({ address });
    const { data: launchpad, refetch: refetchLaunchpad } = useLaunchpad();
    const { data: txReceipt, isLoading: isTxReceiptLoading } = useWaitForTransactionReceipt({ hash, confirmations: CONFIRMATIONS });

    const isValidFileSize = useMemo(() => {
        return !!file?.size && file.size <= MAX_FILE_SIZE;
    }, [file]);

    const isValidForm = useMemo(() => {
        if (!launchpad || !balance) return false;
        return (
            countOfSymbolsValidator(formData.name, 3, 16) &&
            countOfSymbolsValidator(formData.symbol, 3, 10) &&
            countOfSymbolsValidator(formData.description, 10, MAX_INPUT_SYMBOLS) &&
            (formData.websiteUrl ? websiteValidator(formData.websiteUrl) : true) &&
            (formData.chatUrl ? websiteValidator(formData.chatUrl) : true) &&
            (formData.socialUrl ? websiteValidator(formData.socialUrl) : true) &&
            balance?.value >= launchpad?.INITIAL_LIQ &&
            !isProcessing &&
            file &&
            isValidFileSize
        );
    }, [launchpad, balance, formData, isProcessing, file, isValidFileSize]);

    const handleInput = (key: keyof LaunchForm, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleResetForm = useCallback(() => {
        Object.keys(formData).forEach((key) => {
            setFormData((prev) => ({ ...prev, [key]: '' }));
        });
        setFile(undefined);
        randomBytes.current = undefined;
    }, [formData]);

    const handlePreSaveFile = async (file: File, userAddress: Address, randomBytes: Hex, tournamentId: number): Promise<string> => {
        if (!isConnected || !address || !isValidChain || !chainId) {
            throw new Error(LAUNCHER_MESSAGES.INVALID_CONNECTION);
        }

        if (!launchpad) {
            throw new Error(LAUNCHER_MESSAGES.INVALID_VALIDATION);
        }

        const formData = new FormData();
        formData.append('file', file as Blob);

        const params = {
            chainId,
            userAddress,
            randomBytes,
            tournamentId,
            formData,
        };

        const { data } = await apiClient.filePreSave(params);

        console.debug('handlePreSaveFile', data);

        return data.url;
    };

    const handleSaveFile = useCallback(async () => {
        if (!isConnected || !address || !isValidChain || !chainId) {
            throw new Error(LAUNCHER_MESSAGES.INVALID_CONNECTION);
        }

        if (!launchpad || !randomBytes.current) {
            throw new Error(LAUNCHER_MESSAGES.INVALID_VALIDATION);
        }

        const params = { randomBytes: randomBytes.current };
        return await apiClient.fileSave(params);
    }, [isConnected, address, isValidChain, chainId, launchpad]);

    const handleSubmit = async () => {
        if (!address || !isConnected) {
            showDialog(DialogType.error, LAUNCHER_MESSAGES.INVALID_CONNECTION, true);
            return;
        }

        if (!file) {
            showDialog(DialogType.error, LAUNCHER_MESSAGES.INVALID_FILE, true);
            return;
        }

        if (!launchpad || !launchpad.INITIAL_LIQ) {
            showDialog(DialogType.error, LAUNCHER_MESSAGES.INVALID_INITIAL_LIQUIDITY, true);
            return;
        }

        if (!isValidForm) {
            showDialog(DialogType.error, LAUNCHER_MESSAGES.INVALID_VALIDATION, true);
            return;
        }

        const handleSuccess = (hash: Address) => {
            console.debug({ hash });
            setIsProcessing(false);
            setHash(hash);
        };

        const handleError = (error: Error) => {
            console.error(error);
            setIsProcessing(false);
            handleResetForm();
            showDialog(DialogType.error, error.message, true);
        };

        try {
            setIsProcessing(true);
            randomBytes.current = bytesToHex(getRandomBytesSync(24));

            const simulationPrepared = structuredClone(formData);
            simulationPrepared.imageUrl = PLACEHOLDER_IMAGE;

            const simulationArgs = Object.values(simulationPrepared) as LaunchFormArgs;
            simulationArgs[simulationArgs.length - 1] = BigInt(simulationPrepared.donation || 0);

            const simulationParams = {
                args: simulationArgs,
                abi: launchpadAbi,
                address: launchpads[ChainId.ARBITRUM],
                functionName: 'listing',
                value: launchpad.INITIAL_LIQ,
            } as const;

            const [userAddress] = (await simulateContract(wagmiConfig, { ...simulationParams })).result as LaunchSimulationResult;
            const url = await handlePreSaveFile(file, userAddress, randomBytes.current, launchpad.poolingTournament);

            const prepared = { ...simulationPrepared, imageUrl: url };
            const args = Object.values(prepared) as LaunchFormArgs;
            args[args.length - 1] = BigInt(simulationPrepared.donation || 0);

            const params = { ...simulationParams, args };

            writeContract({ ...params }, { onSuccess: handleSuccess, onError: handleError });
        } catch (error) {
            handleError(error as Error);
        }
    };

    useEffect(() => {
        const submit = async () => {
            try {
                setHash(undefined);
                setIsProcessing(false);

                await handleSaveFile();
                handleResetForm();

                setTimeout(() => refetchLaunchpad(), 1000);
                showDialog(DialogType.success, LAUNCHER_MESSAGES.SUBMISSION_SUCCESS, true);
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    showDialog(DialogType.error, error.message, true);
                }
            }
        };

        if (txReceipt) {
            console.debug({ txReceipt });
            submit().catch(console.error);
        }

        return () => {
            setHash(undefined);
        };
    }, [txReceipt, showDialog, refetchLaunchpad, handleResetForm, handleSaveFile]);

    return (
        <Container>
            <motion.div {...springToBottom}>
                <PageContainer>
                    <Flex justifyContent="center">
                        <BoxWrapper>
                            <Box padding="0">
                                <Flex flexDirection="column" alignItems="center">
                                    {/* Token submission */}
                                    <BoxWrapperRow>
                                        <Text fontSize="28px" textAlign="center" lineHeight="1">
                                            Token submission
                                        </Text>

                                        <Flex gap={24}>
                                            <Input.Text value={formData.name} onChange={(v) => handleInput('name', v)} label="Name*" placeholder="Token" />
                                            <Input.Text value={formData.symbol} onChange={(v) => handleInput('symbol', v)} label="Symbol*" placeholder="SYMB" uppercase />
                                        </Flex>

                                        <SupplyBox>
                                            <Flex alignItems="center" justifyContent="space-between" height="100%">
                                                <Text fontSize="18px" textAlign="center" lineHeight="1" color="#ffffff60">
                                                    Supply
                                                </Text>
                                                <Text fontSize="18px" textAlign="center" lineHeight="1" color="#ffffff60">
                                                    1 000 000 000
                                                </Text>
                                            </Flex>
                                        </SupplyBox>
                                    </BoxWrapperRow>

                                    <Flex width="100%" marginLeft="0">
                                        <Line invert />
                                    </Flex>

                                    {/* Launch */}
                                    <BoxWrapperRow>
                                        <Text fontSize="28px" textAlign="center" lineHeight="1">
                                            Launch
                                        </Text>

                                        <Flex gap={24}>
                                            <Input.Token
                                                value={Number(launchpad?.INITIAL_LIQ).toString()}
                                                name={formData.symbol || 'SYMB'}
                                                onChange={() => {}}
                                                label="Select 1 token*"
                                                placeholder="0.00"
                                                disabled
                                            />
                                            <Input.Token value="1" name="ETH" onChange={() => {}} label="Select 2 token*" placeholder="0.00" disabled />
                                        </Flex>
                                    </BoxWrapperRow>

                                    <Flex width="100%" justifyContent="flex-end">
                                        <Line />
                                    </Flex>

                                    {/* Set metadata */}
                                    <BoxWrapperRow>
                                        <Text fontSize="28px" textAlign="center" lineHeight="1">
                                            Set Metadata
                                        </Text>

                                        <Flex gap={24}>
                                            <Input.Link
                                                value={formData.websiteUrl}
                                                onChange={(v) => handleInput('websiteUrl', v)}
                                                label="Website URL"
                                                placeholder="https://website.com"
                                            />
                                            <Input.Link
                                                value={formData.socialUrl}
                                                onChange={(v) => handleInput('socialUrl', v)}
                                                label="Social URL"
                                                placeholder="https://website.com"
                                            />
                                        </Flex>

                                        <Flex gap={24}>
                                            <Input.Link value={formData.chatUrl} onChange={(v) => handleInput('chatUrl', v)} label="Chat URL" placeholder="https://website.com" />
                                            <Input.Link value={formData.donation} onChange={(v) => handleInput('donation', v)} label="Donation" placeholder="https://website.com" />
                                        </Flex>

                                        <Input.Text value={formData.description} onChange={(v) => handleInput('description', v)} label="Description*" placeholder="Few words" />

                                        <Flex gap={24}>
                                            <FileUpload file={file} isValid={isValidFileSize} onChange={setFile} />
                                        </Flex>

                                        <Flex justifyContent="flex-end">
                                            <Absolute left="0" bottom="-36px" zIndex={1}>
                                                <Image src="/img/memes/frog-01.svg" alt="" width={87} height={81} />
                                            </Absolute>

                                            <Show.When isTrue={isValidChain}>
                                                <Button.Primary onClick={handleSubmit} width="300px" disabled={!isValidForm || !isConnected || isTxReceiptLoading}>
                                                    <Show.When isTrue={isTxReceiptLoading || isProcessing}>
                                                        <Loader.Dots />
                                                    </Show.When>

                                                    <Show.When isTrue={!isTxReceiptLoading && !isProcessing}>{isConnected ? 'Create' : 'Connect wallet'}</Show.When>
                                                </Button.Primary>
                                            </Show.When>

                                            <Show.When isTrue={!isValidChain}>
                                                <Button.Primary onClick={() => switchChain({ chainId: ChainId.ARBITRUM })} width="300px" disabled={!isConnected}>
                                                    {isConnected ? 'Switch chain' : 'Connect wallet'}
                                                </Button.Primary>
                                            </Show.When>
                                        </Flex>
                                    </BoxWrapperRow>
                                </Flex>
                            </Box>

                            <Info launchpad={launchpad} />
                        </BoxWrapper>
                    </Flex>
                </PageContainer>
            </motion.div>
        </Container>
    );
}
