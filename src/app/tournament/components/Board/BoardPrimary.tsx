import React, { useMemo } from 'react';
import { Absolute, Flex, Grid, Text } from '@/styles/global';
import { PrimaryPairs, PrimaryWrapper } from './styles';
import Image from 'next/image';

import { Breakpoints } from '@/styles/breakpoints';
import { Show } from '@/components/Show';
import { PairPrimary } from '../Pair';
import { BoardPrimaryProps } from './types';

export const BoardPrimary: React.FC<BoardPrimaryProps> = ({ tournament }) => {
    const bracket = useMemo(() => {
        const _bracket = tournament?.bracket || [];
        // return last 3 elements of the bracket
        return _bracket.slice(_bracket.length - 3, _bracket.length);
    }, [tournament]);

    return (
        <Grid width="100%">
            <Flex justifyContent="center" padding="30px 0">
                <Text fontSize="28px">Tournament</Text>
            </Flex>

            <PrimaryWrapper>
                {bracket.map((pair, i) => (
                    <PrimaryPairs key={i}>
                        {pair.map(([token0, token1], j) => (
                            <PairPrimary key={j} active={tournament?.round === i} token0={token0} token1={token1} />
                        ))}
                    </PrimaryPairs>
                ))}
            </PrimaryWrapper>

            <Show.Toggle showAbove={Breakpoints.md}>
                <Absolute right="0">
                    <Image src="/img/memes/frog-03.svg" alt="" width={434} height={508} />
                </Absolute>
            </Show.Toggle>
        </Grid>
    );
};
