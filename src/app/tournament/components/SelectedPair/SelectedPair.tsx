import React, { useMemo } from 'react';
import { Box } from '@/components/Box';
import { Stats } from '../Stats';
import { Flex, Grid, Text } from '@/styles/global';
import { PairSecondary } from '../Pair/PairSecondary';
import { SelectedPairProps } from './types';
import { Icon } from '@/components/Icon';
import { SelectedPairWrapper } from './styles';
import { getPairPercentByPrice, getPercents } from '@/utils/pairs';

export const SelectedPair: React.FC<SelectedPairProps> = ({ tournament, pair, onClose }) => {
    const pairData = useMemo(() => {
        if (!pair) return null;

        const [token0, token1] = pair;
        const percent = getPairPercentByPrice(token0, token1);
        const [percent0, percent1] = getPercents(token0, token1);

        return { token0, token1, percent, percent0, percent1 };
    }, [pair]);

    return (
        <SelectedPairWrapper>
            <Box padding="0">
                <Stats tournament={tournament} compact />
            </Box>

            <Box padding="16px 40px">
                <Grid>
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="28px" lineHeight="1">
                            Title
                        </Text>
                        <Icon.Svg name="close" size={24} cursor="pointer" onClick={onClose} />
                    </Flex>

                    <PairSecondary
                        token0={pairData?.token0}
                        token1={pairData?.token1}
                        percent={pairData?.percent || 0}
                        percent0={pairData?.percent0 || '0'}
                        percent1={pairData?.percent1 || '0'}
                        transparent
                        compact
                    />
                </Grid>
            </Box>
        </SelectedPairWrapper>
    );
};
