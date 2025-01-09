'use client';

import { Container, PageContainer } from '@/styles/global';
import { springToBottom } from '@/common/animations';
import { motion } from 'framer-motion';

import { Points } from './components/Points';
import { TokensOwned } from './components/TokensOwned';
import { TokensDeployed } from './components/TokensDeployed';
import { TradingVolume } from './components/TradingVolume';
import { DashboardWrapper } from './styles';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { useAccount } from 'wagmi';
import { useProfile } from '@/hooks/useProfile';
import { useMemo } from 'react';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { tokensIsEqual } from '@/utils';
import { Address } from 'viem';
import { useTournament } from '@/hooks/useTournament';

export default function Dashboard() {
    const { address } = useAccount();
    const { chainId } = useActiveChainId();

    const { data: leaderboard } = useLeaderboard({ chainId });
    const { data: tournament, isLoading: isTournamentLoading } = useTournament({ chainId, address });
    const { data: profile, isLoading: isProfileLoading, refetch } = useProfile({ chainId, address, tournament });

    const isLoading = useMemo(() => isProfileLoading || isTournamentLoading, [isProfileLoading, isTournamentLoading]);

    const rating = useMemo(() => {
        if (!leaderboard || !address) return 0;

        const profiles = structuredClone(leaderboard);

        const sortedByPoints = profiles.sort((a, b) => b.points.total - a.points.total);
        const userIndex = sortedByPoints.findIndex((profile) => tokensIsEqual(profile.user.id as Address, address));

        return userIndex + 1;
    }, [leaderboard, address]);

    const tokens = useMemo(() => {
        const tokensOwned = profile?.tokensOwned || [];
        const tokensDeployed = profile?.tokensDeployed || [];
        return { tokensOwned, tokensDeployed };
    }, [profile]);

    return (
        <Container paddingMobile="10px">
            <motion.div {...springToBottom}>
                <PageContainer>
                    <DashboardWrapper>
                        <section>
                            <TokensOwned tokens={tokens.tokensOwned} isLoading={isLoading} />
                        </section>

                        <section>
                            <TradingVolume tradingVolume={profile?.user.tradingVolume} rating={rating} />
                        </section>

                        <section>
                            <TokensDeployed tokens={tokens.tokensDeployed} isLoading={isLoading} onClaimed={refetch} />
                        </section>
                    </DashboardWrapper>

                    <Points points={profile?.points} />
                </PageContainer>
            </motion.div>
        </Container>
    );
}
