import React, { useMemo } from 'react';
import { SecondaryWrapper } from './styles';
import { Flex, Grid, Text } from '@/styles/global';
import { BoardSecondaryProps } from './types';
import { PairSecondary } from '../Pair/PairSecondary';
import { getPairPercentByPrice, getPercents } from '@/utils/pairs';

export const BoardSecondary: React.FC<BoardSecondaryProps> = ({ tournament }) => {
    const bracket = useMemo(() => {
        return tournament?.bracket[tournament.round] || [];
    }, [tournament]);

    return (
        <Grid width="100%">
            <Flex justifyContent="center" padding="30px 0">
                <Text fontSize="28px">Tournament</Text>
            </Flex>

            <SecondaryWrapper>
                {bracket.map(([token0, token1], index) => {
                    const percent = getPairPercentByPrice(token0, token1);
                    const [percent0, percent1] = getPercents(token0, token1);
                    return <PairSecondary key={index} token0={token0} token1={token1} percent={percent} percent0={percent0} percent1={percent1} />;
                })}
            </SecondaryWrapper>
        </Grid>
    );
};
