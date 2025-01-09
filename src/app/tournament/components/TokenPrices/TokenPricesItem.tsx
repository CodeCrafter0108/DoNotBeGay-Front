import React, { useMemo } from 'react';
import { TokenPricesItemProps } from './types';
import { Flex, Text } from '@/styles/global';
import { ImageWithFallback } from '@/components/Image';
import { Formatter } from '@/utils';
import { TokenPricesItemWrapper } from './styles';

export const TokenPricesItem: React.FC<TokenPricesItemProps> = ({ token, index, onSelect }) => {
    const tokenPrice = useMemo(() => {
        return token?.isAvailable ? `${Formatter.formatNumber(token.priceUSD)}$` : 'Outed';
    }, [token]);

    return (
        <TokenPricesItemWrapper isAvailable={token.isAvailable} onClick={() => onSelect(token)}>
            <Flex alignItems="center" gap={5}>
                <Text fontSize="18px">{index}</Text>
                <Flex>
                    <ImageWithFallback src={token.imageUrl} size={24} radius="50%" />
                </Flex>
                <Text fontSize="18px">{token.name}</Text>
            </Flex>
            <Text fontSize="18px">{tokenPrice}</Text>
        </TokenPricesItemWrapper>
    );
};
