import React, { useMemo } from 'react';
import { Flex, Grid, Text } from '@/styles/global';
import { useConfig } from '@/contexts/ConfigContext';
import { Show } from '@/components/Show';

import { SortSelector } from '@/components/SortSelector';
import { Breakpoints } from '@/styles/breakpoints';
import { Formatter } from '@/utils';
import { LeaderBoardTableProps } from './types';
import { TableItemRow, TableItemRowPoints, TableWrapper, TableWrapperContent, TableWrapperItem } from './styles';
import { useAccount } from 'wagmi';
import { ILeaderboardProfile } from '@/types/tournament';

export const Table: React.FC<LeaderBoardTableProps> = ({ profiles }) => {
    const { address } = useAccount();
    const { theme } = useConfig();

    const isActive = useMemo(() => {
        return (profile: ILeaderboardProfile) => String(address).toLowerCase() === String(profile.user.id).toLowerCase();
    }, [address]);

    return (
        <TableWrapper>
            <Show.Toggle showAbove={Breakpoints.md}>
                <TableWrapperContent>
                    <Flex alignItems="center">
                        <Text fontSize="18px" color={theme.gray}>
                            #
                        </Text>
                    </Flex>
                    <Flex alignItems="center">
                        <Text fontSize="18px" color={theme.gray}>
                            Wallet
                        </Text>
                    </Flex>
                    <SortSelector text="Tokens deployed" />
                    <SortSelector text="Trading volume" />
                    <SortSelector text="Staking amount" />
                    <SortSelector text="Total points" />
                </TableWrapperContent>
            </Show.Toggle>

            <Grid gap={0}>
                {profiles.map((profile, index) => (
                    <TableWrapperItem key={index} active={isActive(profile)}>
                        <Flex>
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    #
                                </Text>
                            </Show.Toggle>
                            <Flex alignItems="center">
                                <Text fontSize="18px">{index + 1}.</Text>
                            </Flex>
                        </Flex>

                        <Flex alignItems="center" justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Wallet
                                </Text>
                            </Show.Toggle>

                            <TableItemRow>
                                <Text fontSize="18px">{Formatter.formatAddress(profile.user.id)}</Text>
                            </TableItemRow>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Tokens deployed
                                </Text>
                            </Show.Toggle>
                            <TableItemRowPoints>
                                <Text fontSize="18px" lineHeight="1">
                                    {profile.user.listings?.length} tokens
                                </Text>
                                <Text fontSize="14px" color={theme.gray}>
                                    {Formatter.formatNumber(profile.points.deployed)} points
                                </Text>
                            </TableItemRowPoints>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Trading volume
                                </Text>
                            </Show.Toggle>

                            <TableItemRowPoints>
                                <Text fontSize="18px" lineHeight="1">
                                    ${Formatter.formatNumber(profile.user.tradingVolume)}
                                </Text>
                                <Text fontSize="14px" color={theme.gray}>
                                    {Formatter.formatNumber(profile.points.tradingVolume)} points
                                </Text>
                            </TableItemRowPoints>
                        </Flex>

                        <Flex justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Staking amount
                                </Text>
                            </Show.Toggle>
                            <TableItemRowPoints>
                                <Text fontSize="18px" lineHeight="1">
                                    0
                                </Text>
                                <Text fontSize="14px" color={theme.gray}>
                                    0 points
                                </Text>
                            </TableItemRowPoints>
                        </Flex>

                        <Flex alignItems="center" justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Total points
                                </Text>
                            </Show.Toggle>
                            <TableItemRow>
                                <Text fontSize="18px">{Formatter.formatNumber(profile.points.total, 2)}</Text>
                            </TableItemRow>
                        </Flex>
                    </TableWrapperItem>
                ))}
            </Grid>
        </TableWrapper>
    );
};
