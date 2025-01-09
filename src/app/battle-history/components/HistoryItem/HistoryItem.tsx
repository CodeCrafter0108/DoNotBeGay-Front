import React from 'react';
import { HistoryItemBadge, HistoryItemContent, HistoryItemWrapper } from './styles';
import { Flex, Text } from '@/styles/global';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useConfig } from '@/contexts/ConfigContext';
import { PairState } from '@/types';
import { HistoryItemProps } from './types';

export const HistoryItem: React.FC<HistoryItemProps> = ({ token, tournament }) => {
    const config = useConfig();

    return (
        <HistoryItemWrapper>
            <Flex paddingTop="15px">
                <HistoryItemBadge>Battle #{Number(tournament?.id) + 1}</HistoryItemBadge>
            </Flex>

            <HistoryItemContent>
                <Flex alignItems="center">
                    <Icon.Token.Primary state={PairState.WIN} path={token?.imageUrl || ''} />
                    <Flex flexDirection="column" gap={0}>
                        <Flex gap={5} alignItems="center">
                            <Icon.Svg name="prize-small" size={20} />
                            <Text fontSize="18px" color={config.theme.gray}>
                                Winner
                            </Text>
                        </Flex>
                        <Text fontSize="20px">{token?.name}</Text>
                    </Flex>
                </Flex>

                <Flex>
                    <Button.Secondary>Trade</Button.Secondary>
                </Flex>
            </HistoryItemContent>
        </HistoryItemWrapper>
    );
};
