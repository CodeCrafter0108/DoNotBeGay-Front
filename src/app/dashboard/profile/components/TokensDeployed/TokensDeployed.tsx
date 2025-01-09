import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@/components/Box';
import { Absolute, FadeIn, Flex, Scrollable, Text } from '@/styles/global';
import { ImageWithFallback } from '@/components/Image';
import { Show } from '@/components/Show';
import { TokensDeployedWrapper } from './styles';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';
import { TokensDeployedProps } from './types';
import { Separator } from '@/components/Separator';
import { useConfig } from '@/contexts/ConfigContext';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import { IToken } from '@/types/tournament';
import { launchpads } from '@/config/contracts';
import { launchpadAbi } from '@/config/abis';
import { DialogType, useDialog } from '@/contexts/DialogContext';
import { TOKENS_DEPLOYED_MESSAGES } from '@/config/messages';
import { Hash } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useActiveChainId } from '@/hooks/useActiveChainId';

const CONFIRMATIONS = 1;

export const TokensDeployed: React.FC<TokensDeployedProps> = ({ tokens, isLoading, onClaimed }) => {
    const config = useConfig();
    const { chainId } = useActiveChainId();
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);

    const { writeContract } = useWriteContract();
    const { showDialog } = useDialog();

    const [hash, setHash] = useState<Hash>();
    const [isProcessing, setIsProcessing] = useState(false);

    const { data: txReceipt, isLoading: isTxReceiptLoading } = useWaitForTransactionReceipt({ hash, confirmations: CONFIRMATIONS });

    const filtered = useMemo(() => {
        return tokens?.sort((a, b) => +b.tournamentId - +a.tournamentId);
    }, [tokens]);

    const isPending = useMemo(() => isTxReceiptLoading || isProcessing, [isTxReceiptLoading, isProcessing]);

    const handleClaim = (token: IToken) => {
        const launchpadAddr = launchpads[chainId];

        const params = {
            address: launchpadAddr,
            abi: launchpadAbi,
            functionName: 'delisting',
            args: [BigInt(token.tournamentId), BigInt(token.position)],
        } as const;

        const handleSuccess = (hash: Hash) => {
            setHash(hash);
            setIsProcessing(true);
        };

        const handleError = (error: Error) => {
            console.error('Error claiming token', error);
        };

        writeContract({ ...params }, { onSuccess: handleSuccess, onError: handleError });
    };

    useEffect(() => {
        const check = async () => {
            try {
                onClaimed();
                setHash(undefined);
                setIsProcessing(false);
                showDialog(DialogType.success, TOKENS_DEPLOYED_MESSAGES.CLAIM_SUCCESS, true);
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    showDialog(DialogType.error, error.message, true);
                }
            }
        };

        if (txReceipt) {
            console.debug({ txReceipt });
            check().catch(console.error);
        }

        return () => {
            setHash(undefined);
        };
    }, [txReceipt, onClaimed, showDialog]);

    return (
        <Box padding="30px 5px 30px 40px" overflow="none">
            <TokensDeployedWrapper>
                <Flex alignItems="center" justifyContent="center" paddingBottom="21px">
                    <Text fontSize="28px">Tokens deployed</Text>
                </Flex>

                <Show.When isTrue={isLoading}>
                    <Flex alignItems="center" justifyContent="center">
                        <Loader.Dots color={config.theme.accent} />
                    </Flex>
                </Show.When>

                <Show.When isTrue={!isLoading && !!filtered?.length}>
                    <FadeIn>
                        <Scrollable>
                            <Flex flexDirection="column" height="100%" width="100%" gap={21}>
                                {filtered?.map((token, index) => (
                                    <Flex key={index} justifyContent="space-between" alignItems="center" paddingRight="35px">
                                        <Flex alignItems="center">
                                            <ImageWithFallback src={token.imageUrl} size={24} radius="50%" />

                                            <Flex flexDirection="column" gap={0}>
                                                <Text fontSize="20px" lineHeight="0.7">
                                                    {token.name}
                                                </Text>

                                                <Show.When isTrue={token.isCanClaim && !token.isIncoming}>
                                                    <Flex alignItems="center" gap={5}>
                                                        <Text fontSize="16px" lineHeight="1" color={config.theme.redLight}>
                                                            Rejected
                                                        </Text>
                                                        <Tooltip>
                                                            <Tooltip.Wrapper>
                                                                <Icon.SvgRemote src="/img/icons/info.svg" size="16px" strokeColor={config.theme.redLight} />
                                                            </Tooltip.Wrapper>
                                                            <Tooltip.Content>some tooltip</Tooltip.Content>
                                                        </Tooltip>
                                                    </Flex>
                                                </Show.When>
                                            </Flex>
                                        </Flex>

                                        <Show.When isTrue={!token.isCanClaim && !token.isClaimed}>
                                            <Text fontSize="20px">#{+token.tournamentId + 1}</Text>
                                        </Show.When>

                                        <Show.When isTrue={!!token.isCanClaim && !token.isClaimed && !token.isIncoming}>
                                            <Button.Secondary width="100px" height="34px" disabled={isPending} onClick={() => handleClaim(token)}>
                                                {isPending ? <Loader.Dots color={config.theme.white} /> : 'Claim'}
                                            </Button.Secondary>
                                        </Show.When>

                                        <Show.When isTrue={!!token.isCanClaim && !token.isClaimed && token.isIncoming}>
                                            <Button.Secondary width="100px" height="34px" disabled>
                                                Incoming
                                            </Button.Secondary>
                                        </Show.When>

                                        <Show.When isTrue={!token.isCanClaim && token.isClaimed}>
                                            <Button.Secondary width="100px" height="34px" disabled>
                                                Claimed
                                            </Button.Secondary>
                                        </Show.When>
                                    </Flex>
                                ))}
                            </Flex>
                        </Scrollable>
                    </FadeIn>
                </Show.When>

                <Show.When isTrue={!isLoading && !filtered?.length}>
                    <FadeIn>
                        <Flex flexDirection="column" height="100%" width="100%" justifyContent="center" paddingRight="35px">
                            <Flex flexDirection="column" width="100%" justifyContent="center" alignItems="center" gap={0}>
                                <Image src="/img/memes/bird.svg" alt="" width={142} height={167} />
                                <Flex padding="0 30px" width="100%">
                                    <Separator color={config.theme.accent} />
                                </Flex>
                            </Flex>

                            <Flex justifyContent="center">
                                <Text fontSize="24px" color={config.theme.gray}>
                                    You have not deployed any tokens yet
                                </Text>
                            </Flex>
                        </Flex>
                    </FadeIn>
                </Show.When>
            </TokensDeployedWrapper>

            <Show.When isTrue={showMemes}>
                <Absolute top="40%" right="-22px">
                    <Image src="/img/memes/frog-hand-02.svg" alt="" width={50} height={57} />
                </Absolute>
            </Show.When>
        </Box>
    );
};
