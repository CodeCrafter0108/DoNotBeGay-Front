import React, { useMemo } from 'react';
import { Flex, Grid, Text } from '@/styles/global';
import { useConfig } from '@/contexts/ConfigContext';
import { Show } from '@/components/Show';

import { SortSelector, SortType } from '@/components/SortSelector';
import { Breakpoints } from '@/styles/breakpoints';
import { Formatter } from '@/utils';
import { LeaderBoardTableProps } from './types';
import { TableItemRow, TableItemRowPoints, TableWrapper, TableWrapperContent, TableWrapperItem } from './styles';
import { useAccount } from 'wagmi';
import { useTableSort } from '@/hooks/useTableSort';

type FormatedProfile = {
    id: number;
    wallet: string;
    tokensDeployed: number | undefined;
    tokensDeployedPoints: number;
    tradingVolume: number;
    tradingVolumePoints: number;
    stakingAmount: number;
    stakingAmountPoints: number;
    totalPoints: number;
};

export const Table: React.FC<LeaderBoardTableProps> = ({ profiles, search }) => {
    const { address } = useAccount();
    const { theme } = useConfig();

    const formatedProfiles = useMemo(() => {
        return profiles.map((profile, index) => {
            return {
                id: index + 1,
                wallet: profile?.user?.id,
                tokensDeployed: profile?.user?.listings?.length,
                tokensDeployedPoints: profile?.points?.deployed,
                tradingVolume: profile?.points?.tradingVolume,
                tradingVolumePoints: profile?.points?.tradingVolume,
                stakingAmount: 0,
                stakingAmountPoints: 0,
                totalPoints: profile?.points?.total,
            };
        });
    }, [profiles]);

    const filteredProfiles = useMemo(() => {
        return formatedProfiles.filter((profile) => {
            return String(profile.wallet).toLowerCase().includes(search.toLowerCase());
        });
    }, [formatedProfiles, search]);

    const { sortedData, handleSortChange, sortConfig } = useTableSort({ data: filteredProfiles });

    const isActive = useMemo(() => {
        return (profile: FormatedProfile) => String(address).toLowerCase() === String(profile.wallet).toLowerCase();
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
                    <SortSelector
                        text="Tokens deployed"
                        value={sortConfig.key === 'tokensDeployed' ? sortConfig.direction : SortType.NONE}
                        onChange={() => handleSortChange('tokensDeployed')}
                    />
                    <SortSelector
                        text="Trading volume"
                        value={sortConfig.key === 'tradingVolume' ? sortConfig.direction : SortType.NONE}
                        onChange={() => handleSortChange('tradingVolume')}
                    />
                    <SortSelector
                        text="Staking amount"
                        value={sortConfig.key === 'stakingAmount' ? sortConfig.direction : SortType.NONE}
                        onChange={() => handleSortChange('stakingAmount')}
                    />
                    <SortSelector
                        text="Total points"
                        value={sortConfig.key === 'totalPoints' ? sortConfig.direction : SortType.NONE}
                        onChange={() => handleSortChange('totalPoints')}
                    />
                </TableWrapperContent>
            </Show.Toggle>

            <Grid gap={0}>
                {sortedData.map((profile, index) => (
                    <TableWrapperItem key={index} active={isActive(profile)}>
                        <Flex>
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    #
                                </Text>
                            </Show.Toggle>
                            <Flex alignItems="center">
                                <Text fontSize="18px">{profile.id}.</Text>
                            </Flex>
                        </Flex>

                        <Flex alignItems="center" justifyContent="space-between">
                            <Show.Toggle showBelow={Breakpoints.md}>
                                <Text fontSize="18px" color={theme.gray}>
                                    Wallet
                                </Text>
                            </Show.Toggle>

                            <TableItemRow>
                                <Text fontSize="18px">{Formatter.formatAddress(profile.wallet)}</Text>
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
                                    {profile.tokensDeployed} tokens
                                </Text>
                                <Text fontSize="14px" color={theme.gray}>
                                    {Formatter.formatNumber(profile.tokensDeployedPoints)} points
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
                                    ${Formatter.formatNumber(profile.tradingVolume)}
                                </Text>
                                <Text fontSize="14px" color={theme.gray}>
                                    {Formatter.formatNumber(profile.tradingVolumePoints)} points
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
                                    {Formatter.formatNumber(profile.stakingAmount)}
                                </Text>
                                <Text fontSize="14px" color={theme.gray}>
                                    {Formatter.formatNumber(profile.stakingAmountPoints, 2)} points
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
                                <Text fontSize="18px">{Formatter.formatNumber(profile.totalPoints, 2)}</Text>
                            </TableItemRow>
                        </Flex>
                    </TableWrapperItem>
                ))}
            </Grid>
        </TableWrapper>
    );
};
