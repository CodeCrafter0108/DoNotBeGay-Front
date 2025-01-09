import React from 'react';
import { Flex, Grid, Text } from '@/styles/global';
import { TableWrapper, TableWrapperContent, TableWrapperItem } from '@/app/token-explorer/components/Table/styles';
import { useConfig } from '@/contexts/ConfigContext';
import { Show } from '@/components/Show';

import ArrowUp from './icons/up.svg';
import ArrowDown from './icons/down.svg';
import { SortSelector } from '@/components/SortSelector';
import { Breakpoints } from '@/styles/breakpoints';
import { TokenExplorerProps } from '@/app/token-explorer/components/Table/types';
import { ImageWithFallback } from '@/components/Image';
import { Formatter } from '@/utils';

export const Table: React.FC<TokenExplorerProps> = ({ tokens }) => {
    const { theme } = useConfig();

    return (
        <TableWrapper>
            <Show.Toggle showAbove={Breakpoints.md}>
                <TableWrapperContent>
                    <Flex alignItems="center">
                        <Text fontSize="18px" color={theme.gray}>
                            #
                        </Text>
                    </Flex>
                    <SortSelector text="Coin" />
                    <SortSelector text="Price" />
                    <SortSelector text="1h" />
                    <SortSelector text="24h" />
                    <SortSelector text="24h Volume" />
                    <SortSelector text="Market Cap" />
                </TableWrapperContent>
            </Show.Toggle>

            <Grid gap={0}>
                {tokens.map((token, index) => (
                    <TableWrapperItem key={index}>
                        <Flex>
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    #
                                </Text>
                            </Show.Toggle>
                            <Text fontSize="18px">{index + 1}.</Text>
                        </Flex>

                        <Flex alignItems="center" justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Coin
                                </Text>
                            </Show.Toggle>

                            <Flex>
                                <ImageWithFallback size={24} src={token.imageUrl} radius="50%" />
                                <Text fontSize="18px">{token.name}</Text>
                            </Flex>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Price
                                </Text>
                            </Show.Toggle>
                            <Text fontSize="18px">${Formatter.formatNumber(token.priceUSD)}</Text>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    1h
                                </Text>
                            </Show.Toggle>

                            <Flex alignItems="center" gap={5}>
                                {token.changePrice1hIncreased ? <ArrowUp /> : token.changePrice1hDecreased ? <ArrowDown /> : null}
                                <Text fontSize="18px" color={token.changePrice1hIncreased ? theme.green : token.changePrice1hDecreased ? theme.red : theme.gray}>
                                    {Formatter.formatBalance(token.changePrice1h)}%
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    24h
                                </Text>
                            </Show.Toggle>

                            <Flex alignItems="center" gap={5}>
                                {token.changePrice24hIncreased ? <ArrowUp /> : token.changePrice24hDecreased ? <ArrowDown /> : null}
                                <Text fontSize="18px" color={token.changePrice24hIncreased ? theme.green : token.changePrice24hDecreased ? theme.red : theme.gray}>
                                    {Formatter.formatBalance(token.changePrice24h)}%
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    24h Volume
                                </Text>
                            </Show.Toggle>
                            <Text fontSize="18px" tabular>
                                ${Formatter.formatBalance(Formatter.formatBalance(token.volume24h))}
                            </Text>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Market Cap
                                </Text>
                            </Show.Toggle>
                            <Text fontSize="18px">$0</Text>
                        </Flex>
                    </TableWrapperItem>
                ))}
            </Grid>
        </TableWrapper>
    );
};
