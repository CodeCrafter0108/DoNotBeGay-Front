import { Icon } from '@/components/Icon';
import { useConfig } from '@/contexts/ConfigContext';
import { Flex, Grid, Text } from '@/styles/global';
import { PairState } from '@/types';
import React from 'react';
import { SecondaryWrapperItem, SecondaryWrapperItemWrapper, Range } from './styles';
import { SecondaryPairProps } from './types';
import { Formatter } from '@/utils';

export const PairSecondary: React.FC<SecondaryPairProps> = ({ token0, token1, percent, percent0, percent1, transparent, compact }) => {
    const config = useConfig();

    return (
        <SecondaryWrapperItem color={config.theme.accent} transparent={transparent} compact={compact}>
            <Grid width="100%">
                <SecondaryWrapperItemWrapper>
                    <Flex alignItems="center">
                        <Icon.Token.Primary state={PairState.WIN} path={token0?.imageUrl || ''} size={40} />
                        <Flex flexDirection="column" gap={0}>
                            <Text fontSize="20px" lineHeight="1">
                                {token0?.name}
                            </Text>
                            <Flex gap={5}>
                                <Text fontSize="16px" lineHeight="1">
                                    Price:
                                </Text>
                                <Text fontSize="16px" lineHeight="1">
                                    {Formatter.formatNumber(token0?.priceUSD, 4)}$
                                </Text>
                            </Flex>
                            <Flex gap={5}>
                                <Text fontSize="16px" lineHeight="1">
                                    Liq:
                                </Text>
                                <Text fontSize="16px" lineHeight="1">
                                    {Formatter.formatNumber(token0?.totalLiquidityUSD, 4)}$
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex justifyContent="center" alignItems="center">
                        <Text fontSize="40px" color={config.theme.accent}>
                            VS
                        </Text>
                    </Flex>

                    <Flex alignItems="center" justifyContent="flex-end">
                        <Flex flexDirection="column" gap={0}>
                            <Text fontSize="20px" lineHeight="1" textAlign="right">
                                {token1?.name}
                            </Text>
                            <Flex gap={5}>
                                <Text fontSize="16px" lineHeight="1" textAlign="right">
                                    Price:
                                </Text>
                                <Text fontSize="16px" lineHeight="1" textAlign="right">
                                    {Formatter.formatNumber(token1?.priceUSD, 4)}$
                                </Text>
                            </Flex>
                            <Flex gap={5} justifyContent="flex-end">
                                <Text fontSize="16px" lineHeight="1" textAlign="right">
                                    Liq:
                                </Text>
                                <Text fontSize="16px" lineHeight="1" textAlign="right">
                                    {Formatter.formatNumber(token1?.totalLiquidityUSD, 4)}$
                                </Text>
                            </Flex>
                        </Flex>
                        <Icon.Token.Primary state={PairState.WIN} path={token1?.imageUrl || ''} size={40} />
                    </Flex>
                </SecondaryWrapperItemWrapper>

                <Range percent={percent}>
                    <span>{percent0}%</span>
                    <span>{percent1}%</span>
                </Range>
            </Grid>
        </SecondaryWrapperItem>
    );
};
