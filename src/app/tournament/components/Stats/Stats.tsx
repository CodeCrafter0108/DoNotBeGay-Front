import React from 'react';
import { Flex, Grid, Line, Text } from '@/styles/global';
import { Timer } from '@/components/Timer';
import { StatsItems, StatsWrapper } from '@/app/tournament/components/Stats/styles';
import { StatsProps } from '@/app/tournament/components/Stats/types';
import { Formatter } from '@/utils';

export const Stats: React.FC<StatsProps> = ({ tournament, compact }) => {
    return (
        <Grid width="100%">
            <StatsWrapper compact={compact}>
                <Flex flex={1}>
                    <Text fontSize="28px">Tournament Stats</Text>
                </Flex>

                <StatsItems>
                    <Flex flexDirection="column" gap={0} alignItems="center">
                        <Text fontSize="18px" color="#ffffff60">
                            Players
                        </Text>
                        <Text fontSize="37px" lineHeight="1">
                            {tournament?.users?.length || 0}
                        </Text>
                    </Flex>

                    <Flex flexDirection="column" gap={0} alignItems="center">
                        <Text fontSize="18px" color="#ffffff60">
                            Total prize pool
                        </Text>
                        <Text fontSize="37px" lineHeight="1">
                            ${Formatter.formatNumber(tournament?.totalPrize || 0)}
                        </Text>
                    </Flex>

                    <Flex flexDirection="column" gap={0} alignItems="center">
                        <Text fontSize="18px" color="#ffffff60">
                            Round
                        </Text>
                        <Text fontSize="37px" lineHeight="1">
                            {(tournament?.round || 0) + 1}/{tournament?.lastRound}
                        </Text>
                    </Flex>

                    <Flex flexDirection="column" gap={0} alignItems="center">
                        <Text fontSize="18px" color="#ffffff60">
                            Time of Battle
                        </Text>
                        <Timer timestamp={Number(tournament?.date || 0)} />
                    </Flex>
                </StatsItems>
            </StatsWrapper>

            {!compact && <Line invert />}
        </Grid>
    );
};
