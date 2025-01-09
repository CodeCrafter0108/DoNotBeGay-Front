import React, { useMemo } from 'react';
import { PrimaryPairWrapper, PrimaryPairConnectLine, PrimaryPairItem, PrimaryPairConnectLineItem, PrimaryPairConnectLineCircle } from './styles';
import { Icon } from '@/components/Icon';
import { Show } from '@/components/Show';
import { PairState } from '@/types';
import { Breakpoints } from '@/styles/breakpoints';
import { Flex, Grid } from '@/styles/global';
import { PrimaryPairProps } from './types';

export const PairPrimary: React.FC<PrimaryPairProps> = ({ active, token0, token1 }) => {
    const token0State = useMemo(() => {
        if (active) return PairState.ACTIVE;
        if (!token0) return PairState.INACTIVE;
        if (token0.isWin) return PairState.WIN;
        if (!token0.isWin) return PairState.LOSE;
        return PairState.ACTIVE;
    }, [token0, active]);

    const token1State = useMemo(() => {
        if (active) return PairState.ACTIVE;
        if (!token1) return PairState.INACTIVE;
        if (token1.isWin) return PairState.WIN;
        if (!token1.isWin) return PairState.LOSE;
        return PairState.ACTIVE;
    }, [token1, active]);

    const token0Icon = useMemo(() => {
        if (!token0) return '';
        return token0.imageUrl;
    }, [token0]);

    const token1Icon = useMemo(() => {
        if (!token1) return '';
        return token1.imageUrl;
    }, [token1]);

    return (
        <PrimaryPairWrapper>
            {/* token0 */}
            <PrimaryPairItem state={token0State}>
                <Icon.Token.Primary state={token0State} path={token0Icon} />

                <Show.Toggle showAbove={Breakpoints.md}>
                    {token0?.isWin && (
                        <Grid gap={0}>
                            <Flex alignItems="center" gap={5}>
                                <Icon.Svg name="prize-accent" size={20} />
                                <small>Winner</small>
                            </Flex>
                            <span>{token0?.name}</span>
                        </Grid>
                    )}

                    {!token0?.isWin && !active && (
                        <Flex alignItems="center">
                            <Icon.Svg name="lose" size={20} />
                            <span>{token0?.name}</span>
                        </Flex>
                    )}

                    {!token0?.isWin && active && <span>{token0?.name}</span>}
                </Show.Toggle>
            </PrimaryPairItem>

            {/* token1 */}
            <PrimaryPairItem state={token1State}>
                <Icon.Token.Primary state={token1State} path={token1Icon} />

                <Show.Toggle showAbove={Breakpoints.md}>
                    {token1?.isWin && (
                        <Grid gap={0}>
                            <Flex alignItems="center" gap={5}>
                                <Icon.Svg name="prize-accent" size={20} />
                                <small>Winner</small>
                            </Flex>
                            <span>{token1?.name}</span>
                        </Grid>
                    )}

                    {!token1?.isWin && !active && (
                        <Flex alignItems="center">
                            <Icon.Svg name="lose" size={20} />
                            <span>{token1?.name}</span>
                        </Flex>
                    )}

                    {!token1?.isWin && active && <span>{token1?.name}</span>}
                </Show.Toggle>
            </PrimaryPairItem>

            {/* lines */}
            <PrimaryPairConnectLine>
                <PrimaryPairConnectLineItem position="top" state={token0State} />
                <PrimaryPairConnectLineItem position="bottom" state={token1State} />
                {token0 && token1 && <PrimaryPairConnectLineCircle />}
            </PrimaryPairConnectLine>
        </PrimaryPairWrapper>
    );
};
