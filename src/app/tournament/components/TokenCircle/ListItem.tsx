import React, { useMemo } from 'react';
import { ListItemProps } from './types';
import { Flex, Text } from '@/styles/global';
import { ImageWithFallback } from '@/components/Image';
import { Formatter } from '@/utils';
import { ListItemWrapper } from './styles';

export const ListItem: React.FC<ListItemProps> = ({ token, index, onSelect }) => {
    const tokenPrice = useMemo(() => {
        return token?.isAvailable ? `${Formatter.formatNumber(token.balanceUsd)}$` : 'Outed';
    }, [token]);

    return (
        <ListItemWrapper isAvailable={token.isAvailable} onClick={() => onSelect(token)}>
            <Flex alignItems="center" gap={5}>
                <Text fontSize="18px">{index}</Text>
                <Flex>
                    <ImageWithFallback src={token.imageUrl} size={24} radius="50%" />
                </Flex>
                <Text fontSize="18px">{token.name}</Text>
            </Flex>
            <Text fontSize="18px">{tokenPrice}</Text>
        </ListItemWrapper>
    );
};
