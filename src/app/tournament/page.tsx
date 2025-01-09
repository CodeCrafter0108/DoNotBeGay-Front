'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';

import { IToken } from '@/types/tournament';
import { useConfig } from '@/contexts/ConfigContext';
import { useTournament } from '@/hooks/useTournament';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { springToBottom, springZoomIn } from '@/common/animations';

import { Box } from '@/components/Box';
import { Show } from '@/components/Show';
import { Loader } from '@/components/Loader';

import { TokenSwap } from './components/TokenSwap';
import { TokenPrices } from './components/TokenPrices';
import { TokenCircle } from './components/TokenCircle';
import { Board } from './components/Board';
import { Stats } from './components/Stats';
import { SelectedPair } from './components/SelectedPair';

import { Container, FadeIn, Flex, Grid, PageContainer } from '@/styles/global';
import { TournamentWrapper } from './styles';

export default function Tournament() {
    const { theme } = useConfig();
    const { address } = useAccount();
    const { chainId } = useActiveChainId();
    const { data, isLoading, refetch } = useTournament({ address, chainId });

    const [pair, setPair] = useState<IToken[]>();

    const started = useMemo(() => {
        return data?.isTournamentActive || false;
    }, [data]);

    const tokens = useMemo(() => {
        return data?.tokens;
    }, [data]);

    const nativeToken = useMemo(() => {
        return data?.nativeToken;
    }, [data]);

    const handleSelectPair = (token: IToken) => {
        const bracket = data?.bracket[data.round];
        const pair = bracket?.find(([token0, token1]) => token0?.address === token.address || token1?.address === token.address);
        if (!pair) return;

        setPair(pair);
    };

    return (
        <Container>
            <motion.div {...springToBottom}>
                <PageContainer height={started ? '' : '100%'}>
                    {/* Top section with swaps, prices and balances */}
                    <Show.When isTrue={started}>
                        <TournamentWrapper>
                            <TokenSwap tokens={tokens} nativeToken={nativeToken} onSwap={refetch} onApprove={refetch} />
                            <TokenPrices tokens={tokens} isLoading={isLoading} onSelect={handleSelectPair} />
                            <TokenCircle tokens={tokens} isLoading={isLoading} onSelect={handleSelectPair} />
                        </TournamentWrapper>
                    </Show.When>

                    <Grid gap={24}>
                        {/* Selected pair and compact stats data */}
                        <Show.When isTrue={!!pair && !isLoading}>
                            <motion.section {...springZoomIn}>
                                <SelectedPair tournament={data} pair={pair} onClose={() => setPair(undefined)} />
                            </motion.section>
                        </Show.When>

                        {/* Loader */}
                        <Show.When isTrue={isLoading}>
                            <Flex alignItems="center" justifyContent="center">
                                <Box width="200px" height="200px">
                                    <Flex width="100%" height="100%" alignItems="center" justifyContent="center">
                                        <Loader.Text text="Loading" fontSize="24px" />
                                    </Flex>
                                </Box>
                            </Flex>
                        </Show.When>

                        {/* Specific board and normal stats data */}
                        <Show.When isTrue={!isLoading}>
                            <Box padding="0" backgroundColor={started ? theme.bg : 'transparent'}>
                                <Show.When isTrue={!pair && started}>
                                    <FadeIn height="auto">
                                        <Stats tournament={data} />
                                    </FadeIn>
                                </Show.When>

                                <Board started={started} tournament={data} isLoading={isLoading} />
                            </Box>
                        </Show.When>
                    </Grid>
                </PageContainer>
            </motion.div>
        </Container>
    );
}
