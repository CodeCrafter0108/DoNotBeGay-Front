import React, { useMemo } from 'react';
import { Show } from '@/components/Show';
import { BoardPrimary } from './BoardPrimary';
import { BoardSecondary } from './BoardSecondary';
import { BoardWaiting } from './BoardWaiting';
import { BoardProps } from './types';
import { FadeIn, Flex } from '@/styles/global';
import { Box } from '@/components/Box';

export const Board: React.FC<BoardProps> = ({ started, tournament, isLoading }) => {
    const activePairs = useMemo(() => {
        return tournament?.bracket?.[tournament.round] || [];
    }, [tournament]);

    const isWaitingShow = useMemo(() => {
        return !isLoading && !started;
    }, [isLoading, started]);

    const isPrimaryShow = useMemo(() => {
        return !isLoading && started && activePairs.length <= 4;
    }, [activePairs, isLoading, started]);

    const isSecondaryShow = useMemo(() => {
        return !isLoading && started && activePairs.length > 4;
    }, [activePairs, isLoading, started]);

    return (
        <>
            <Show.When isTrue={isWaitingShow}>
                <FadeIn>
                    <Flex width="100%" height="100%" alignItems="center" justifyContent="center">
                        <Box padding="0">
                            <BoardWaiting tournament={tournament} />
                        </Box>
                    </Flex>
                </FadeIn>
            </Show.When>

            <Show.When isTrue={isPrimaryShow}>
                <FadeIn>
                    <BoardPrimary tournament={tournament} />
                </FadeIn>
            </Show.When>

            <Show.When isTrue={isSecondaryShow}>
                <FadeIn>
                    <BoardSecondary tournament={tournament} />
                </FadeIn>
            </Show.When>
        </>
    );
};
