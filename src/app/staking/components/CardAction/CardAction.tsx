import React, { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Box } from '@/components/Box';
import { Input } from '@/components/Input';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { useNativeToken } from '@/hooks/useNativeToken';
import { Flex, Text } from '@/styles/global';
import { Formatter } from '@/utils';
import { Button } from '@/components/Button';
import { CardActionProps } from './types';

export const CardAction: React.FC<CardActionProps> = ({ title, actionText, onAction }) => {
    const { address } = useAccount();
    const { chainId } = useActiveChainId();
    const { data: nativeToken } = useNativeToken({ address, chainId });

    const [amount, setAmount] = useState<string>('');

    const handleChange = (value: string) => {
        setAmount(value);
    };

    const handleMax = () => {
        setAmount(nativeToken?.balance || '0');
    };

    const amountUSD = useMemo(() => {
        if (!amount || !nativeToken || !nativeToken.priceUSD) return '0';
        return Formatter.formatNumber(+amount * +nativeToken.priceUSD);
    }, [nativeToken, amount]);

    return (
        <Box padding="30px 40px">
            <Flex flexDirection="column" justifyContent="space-between" height="100%">
                <Flex flexDirection="column" gap={12}>
                    <Text fontSize="28px" textAlign="center" lineHeight="1">
                        {title}
                    </Text>

                    <Input.Currency
                        fontSize="24px"
                        height="70px"
                        token={nativeToken}
                        value={amount}
                        valueUsd={amountUSD}
                        balance={nativeToken?.balance}
                        selectable={false}
                        onChange={(v) => handleChange(v)}
                        onMax={handleMax}
                    />
                </Flex>

                <Button.Primary width="100%" onClick={onAction}>
                    {actionText}
                </Button.Primary>
            </Flex>
        </Box>
    );
};
