import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Absolute, Flex, Grid, Line, Text } from '@/styles/global';
import { Box } from '@/components/Box';
import { Show } from '@/components/Show';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Wrapper, WrapperContent, WrapperOverlay } from '@/components/Modals/styles';
import { ModalTokenSelect } from '@/components/Modals/ModalTokenSelect';

import Image from 'next/image';
import { ActionWrapper, FeeWrapper, IconWrapper, SwapInputsWrapper } from './styles';
import { SlippageType, TokenSwapProcessingType, TokenSwapProps } from './types';
import { AnimatePresence } from 'framer-motion';
import { ChainId, LOCAL_STORAGE_KEYS } from '@/config/constants';
import { Formatter } from '@/utils';
import { useAmounts } from '@/hooks/useAmounts';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AmountType } from '@/types';
import { IToken } from '@/types/tournament';

import { useAccount, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { routers } from '@/config/contracts';
import { routerAbi, tokenAbi } from '@/config/abis';
import { DialogType, useDialog } from '@/contexts/DialogContext';
import { Loader } from '@/components/Loader';
import { TokenSlippage } from './TokenSlippage';
import { useIsValidChain } from '@/hooks/useIsValidChain';
import { useConfig } from '@/contexts/ConfigContext';
import { SWAP_MESSAGES } from './messages';

export const TokenSwap: React.FC<TokenSwapProps> = ({ tokens, nativeToken, onSwap, onApprove }) => {
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);

    const config = useConfig();
    const { address, isConnected } = useAccount();
    const { showDialog } = useDialog();
    const { data: isValidChain } = useIsValidChain();
    const { switchChain } = useSwitchChain();

    const [amount, setAmount] = useState<bigint>(0n);
    const [amountIn, setAmountIn] = useState('');
    const [amountOut, setAmountOut] = useState('');
    const [amountType, setAmountType] = useState<AmountType>(AmountType.IN);
    const [slippage, setSlippage] = useState<SlippageType | number>(SlippageType.AUTO);

    const [modalTokenSelectType, setModalTokenSelectType] = useState<AmountType>(amountType);
    const [showModalTokenSelect, setShowModalTokenSelect] = useState(false);

    const [swapProcessing, setSwapProcessing] = useState(false);
    const [approveProcessing, setApproveProcessing] = useState(false);
    const [processingType, setProcessingType] = useState<TokenSwapProcessingType | null>(null);

    const [fromToken, setFromToken] = useState<IToken>(nativeToken as IToken);
    const [toToken, setToToken] = useState<IToken>(tokens?.filter((t) => t.isAvailable)[0] as IToken);

    const [debouncedAmountIn] = useDebounce(amountIn, 300);
    const [debouncedAmountOut] = useDebounce(amountOut, 300);

    const { data: amountData } = useAmounts({ amount, type: amountType, fromToken, toToken });
    const { data: hash, writeContract, reset } = useWriteContract();
    const { data: txReceipt } = useWaitForTransactionReceipt({ hash, confirmations: 1 });

    const tokensWithBalance = useMemo(() => {
        if (!nativeToken) return [];
        const _tokens = tokens?.filter((t) => t.balanceRaw > 0n) || [];
        return [nativeToken, ..._tokens];
    }, [nativeToken, tokens]);

    const tokensList = useMemo(() => {
        const isNative = amountType === AmountType.IN ? fromToken?.isNative : toToken?.isNative;
        return isNative ? tokensWithBalance : tokens || [];
    }, [amountType, tokensWithBalance, tokens, fromToken, toToken]);

    const slippageTolerance = useMemo(() => {
        return Formatter.getSlippageTolerance(slippage);
    }, [slippage]);

    const isValidAllowance = useMemo(() => {
        if (!address || !fromToken) return false;
        return fromToken.isNative ? true : fromToken.allowance >= amount;
    }, [fromToken, address, amount]);

    const isValidBalance = useMemo(() => {
        if (!amount) return false;
        return fromToken?.balanceRaw >= amount;
    }, [fromToken, amount]);

    const isSwapDisabled = useMemo(() => {
        return !isConnected || !isValidChain || !amount || !fromToken || !toToken || !amountData || !isValidAllowance || !isValidBalance || swapProcessing;
    }, [amountData, isConnected, isValidAllowance, fromToken, toToken, amount, swapProcessing, isValidChain, isValidBalance]);

    const fromTokenBalanceUsd = useMemo(() => {
        if (!amountIn || !fromToken) return '0.00';
        return Formatter.formatNumber(Number(fromToken.priceUSD) * Number(amountIn));
    }, [amountIn, fromToken]);

    const toTokenBalanceUsd = useMemo(() => {
        if (!amountOut || !toToken) return '0.00';
        return Formatter.formatNumber(Number(toToken.priceUSD) * Number(amountOut));
    }, [amountOut, toToken]);

    const handleOpenModal = (type: AmountType) => {
        setAmountType(type);
        setModalTokenSelectType(type);
        setShowModalTokenSelect(true);
        handleReset();
    };

    const handleCloseModal = () => {
        setShowModalTokenSelect(false);
    };

    const handleChange = (value: string, type: AmountType) => {
        setAmountType(type);
        if (type === AmountType.IN) {
            setAmountIn(value);
        } else {
            setAmountOut(value);
        }
    };

    const handleMax = (type: AmountType) => {
        const token = type === AmountType.IN ? fromToken : toToken;
        if (!token) return;

        const balance = Formatter.bigintToAmount(token.balanceRaw || 0n);
        if (!balance) return;

        setAmountType(type);
        if (type === AmountType.IN) {
            setAmountIn(balance);
        } else {
            setAmountOut(balance);
        }
    };

    const handleTokenSelect = (type: AmountType, token: IToken) => {
        if (!tokens?.length) return;

        const isIn = type === AmountType.IN;
        const isNative = token.isNative;

        setFromToken(isIn ? token : isNative ? tokens[0] : (nativeToken as IToken));
        setToToken(isIn ? (isNative ? tokens[0] : (nativeToken as IToken)) : token);

        handleReset();
        handleCloseModal();
    };

    const handleToggleAmountType = () => {
        if (!fromToken || !toToken) return;

        const type = amountType === AmountType.IN ? AmountType.OUT : AmountType.IN;
        const _fromToken = fromToken;
        const _toToken = toToken;

        handleReset();
        setAmountType(type);
        setFromToken(_toToken);
        setToToken(_fromToken);
    };

    const handleReset = () => {
        setAmountIn('');
        setAmountOut('');
    };

    const handleSwitchChain = () => {
        switchChain({ chainId: ChainId.ARBITRUM });
    };

    /**
     * Approve token for swap
     * @notice callable in user wallet
     */
    const handleApprove = async () => {
        if (!address || !fromToken?.address) return;

        const router = routers[ChainId.ARBITRUM];

        const approveParams = {
            address: fromToken.address,
            abi: tokenAbi,
            functionName: 'approve',
            args: [router, amount],
        } as const;

        const handleSuccess = () => {
            showDialog(DialogType.success, SWAP_MESSAGES.approveSuccess, true);
            setApproveProcessing(true);
            setProcessingType(TokenSwapProcessingType.APPROVE);
        };

        const handleError = (error: Error) => {
            console.error(error);
            showDialog(DialogType.error, error.message, true);
            setApproveProcessing(false);
            setProcessingType(null);
        };

        try {
            writeContract({ ...approveParams }, { onSuccess: handleSuccess, onError: handleError });
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Swap tokens
     * @notice callable in user wallet
     */
    const handleSwap = async () => {
        if (!address || !fromToken?.address || !toToken?.address || !nativeToken?.address) return;

        const router = routers[ChainId.ARBITRUM];

        const deadline = Formatter.amountToBigint(String(Math.floor(Date.now() / 1000) + 60 * 20));
        const desiredAmtIn = Formatter.amountToBigint(amountIn);
        const desiredAmtOut = Formatter.amountToBigint(amountOut);
        const path = fromToken.isNative ? [nativeToken.address, toToken.address] : [fromToken.address, nativeToken.address];

        const desiredAmtOutWithSlippage = Formatter.amountWithSlippage(desiredAmtOut, slippageTolerance);

        const ethForTokensParams = {
            address: router,
            abi: routerAbi,
            functionName: 'swapExactETHForTokens',
            args: [desiredAmtOutWithSlippage, path, address, deadline],
            value: desiredAmtIn,
        } as const;

        const tokensForEthParams = {
            address: router,
            abi: routerAbi,
            functionName: 'swapExactTokensForETH',
            args: [desiredAmtIn, desiredAmtOutWithSlippage, path, address, deadline],
        } as const;

        const handleSuccess = () => {
            showDialog(DialogType.success, SWAP_MESSAGES.swapSuccess, true);
            handleReset();
            setSwapProcessing(true);
            setProcessingType(TokenSwapProcessingType.SWAP);
        };

        const handleError = (error: Error) => {
            console.error(error);
            showDialog(DialogType.error, error.message, true);
            setSwapProcessing(false);
            setProcessingType(null);
        };

        try {
            if (fromToken.isNative) {
                writeContract({ ...ethForTokensParams }, { onSuccess: handleSuccess, onError: handleError });
            } else {
                writeContract({ ...tokensForEthParams }, { onSuccess: handleSuccess, onError: handleError });
            }
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Update amount in and amount out when amount data changes
     * @notice amount data is the amount in and amount out in raw format
     */
    useEffect(() => {
        if (amountType === AmountType.IN) {
            if (!Number(amountIn)) return setAmountOut('');
            amountData && setAmountOut(Formatter.bigintToAmount(amountData));
        } else if (amountType === AmountType.OUT) {
            if (!Number(amountOut)) return setAmountIn('');
            amountData && setAmountIn(Formatter.bigintToAmount(amountData));
        }
    }, [amountType, amountData, amountIn, amountOut]);

    /**
     * Update amount when amount in or amount out changes
     * @notice amount in and amount out are in string format
     */
    useEffect(() => {
        if (amountType === AmountType.IN) {
            setAmount(Formatter.amountToBigint(debouncedAmountIn));
        } else if (amountType === AmountType.OUT) {
            setAmount(Formatter.amountToBigint(debouncedAmountOut));
        }
    }, [debouncedAmountIn, debouncedAmountOut, amountType]);

    /**
     * Set default from and to tokens
     * @notice set default from token to native token and default to token to the first token in the list
     */
    useEffect(() => {
        if (!tokens?.length) return;

        const availableTokens = tokens.filter((token) => token.isAvailable);
        if (!availableTokens.length) return;

        if (!toToken) setToToken(availableTokens[0]);
        if (!fromToken && nativeToken) setFromToken(nativeToken as IToken);
    }, [fromToken, toToken, tokens, nativeToken]);

    /**
     * Update from and to tokens when tokens list changes
     * @notice set from and to tokens to the updated tokens
     */
    useEffect(() => {
        if (fromToken) {
            const updatedFromToken = tokens?.find((token) => token.address === fromToken.address);
            if (updatedFromToken) setFromToken(updatedFromToken);
        }

        if (toToken) {
            const updatedToToken = tokens?.find((token) => token.address === toToken.address);
            if (updatedToToken) setToToken(updatedToToken);
        }
    }, [tokens, fromToken, toToken]);

    /**
     * Reset processing type, and call callback function (onSwap or onApprove)
     * when transaction receipt is available
     */
    useEffect(() => {
        if (txReceipt) {
            console.debug(txReceipt);
            setProcessingType(null);
            reset();

            if (processingType === TokenSwapProcessingType.SWAP) {
                onSwap();
                setSwapProcessing(false);
            } else if (processingType === TokenSwapProcessingType.APPROVE) {
                onApprove();
                setApproveProcessing(false);
            }
        }
    }, [txReceipt, reset, processingType, onSwap, onApprove]);

    return (
        <>
            <Box padding="0">
                <Grid>
                    <Flex justifyContent="center" paddingTop="10px">
                        <Text fontSize="28px">Swap</Text>
                    </Flex>

                    <SwapInputsWrapper>
                        <Input.Currency
                            fontSize="24px"
                            height="70px"
                            token={fromToken}
                            value={amountIn}
                            valueUsd={fromTokenBalanceUsd}
                            valueType={AmountType.IN}
                            balance={fromToken?.balance}
                            onChange={(v) => handleChange(v, AmountType.IN)}
                            onSelect={handleOpenModal}
                            onMax={handleMax}
                        />
                        <IconWrapper onClick={handleToggleAmountType}>
                            <Icon.Svg name="arrow-toggle" />
                        </IconWrapper>
                        <Input.Currency
                            fontSize="24px"
                            height="70px"
                            token={toToken}
                            value={amountOut}
                            valueUsd={toTokenBalanceUsd}
                            valueType={AmountType.OUT}
                            balance={toToken?.balance}
                            onChange={(v) => handleChange(v, AmountType.OUT)}
                            onSelect={handleOpenModal}
                            onMax={handleMax}
                        />
                    </SwapInputsWrapper>
                </Grid>

                <Flex padding="30px 0">
                    <Line invert />
                </Flex>

                <TokenSlippage slippage={slippage} onChange={setSlippage} />

                <FeeWrapper>
                    <Text fontSize="18px" color={config.theme.gray600}>
                        Swap fee (1%)
                    </Text>
                    <Text fontSize="18px" color={config.theme.gray600}>
                        $0.00
                    </Text>
                </FeeWrapper>

                <ActionWrapper>
                    <Show.When isTrue={isValidAllowance && isValidChain}>
                        <Button.Primary width="300px" onClick={handleSwap} disabled={isSwapDisabled}>
                            <Show.When isTrue={!isConnected}>Connect wallet</Show.When>
                            <Show.When isTrue={isConnected && isValidChain}>{swapProcessing ? <Loader.Dots /> : 'Swap'}</Show.When>
                        </Button.Primary>
                    </Show.When>

                    <Show.When isTrue={!isValidAllowance && isValidChain}>
                        <Button.Primary width="300px" onClick={handleApprove} disabled={approveProcessing}>
                            <Show.When isTrue={!isConnected}>Connect wallet</Show.When>
                            <Show.When isTrue={isConnected && isValidChain}>{approveProcessing ? <Loader.Dots /> : 'Approve'}</Show.When>
                        </Button.Primary>
                    </Show.When>

                    <Show.When isTrue={!isValidChain}>
                        <Button.Primary width="300px" onClick={handleSwitchChain}>
                            Invalid chain
                        </Button.Primary>
                    </Show.When>
                </ActionWrapper>

                <Show.When isTrue={showMemes}>
                    <Absolute bottom="-6px" left="0">
                        <Image src="/img/memes/swap.svg" alt="" width={101} height={100} />
                    </Absolute>
                </Show.When>
            </Box>

            <AnimatePresence>
                {showModalTokenSelect && (
                    <Wrapper>
                        <WrapperOverlay onClick={handleCloseModal} />
                        <WrapperContent>
                            <ModalTokenSelect tokens={tokensList} valueType={modalTokenSelectType} onSelect={handleTokenSelect} onClose={handleCloseModal} />
                        </WrapperContent>
                    </Wrapper>
                )}
            </AnimatePresence>
        </>
    );
};
