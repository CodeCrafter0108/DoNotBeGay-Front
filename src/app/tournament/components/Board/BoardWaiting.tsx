import React, { useMemo } from 'react';
import { TournamentWinnerContent, TournamentWinnerHead, TournamentWinnerWrapper, WaitingWrapper, WaitingWrapperContent, WaitingWrapperTitle } from './styles';
import { FadeIn, Flex, Text } from '@/styles/global';
import { Range } from '@/components/Range';
import { Button } from '@/components/Button';
import { BoardWaitingProps } from './types';
import { useLaunchpad } from '@/hooks/useLaunchpad';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { useHistory } from '@/hooks/useHistory';
import { Icon } from '@/components/Icon';
import { useConfig } from '@/contexts/ConfigContext';
import { IHistoryItem } from '@/types/tournament';
import Image from 'next/image';
import Link from 'next/link';

interface TournamentWinnerProps {
    winner: IHistoryItem;
}

const TournamentId: React.FC<BoardWaitingProps> = ({ tournament }) => {
    return (
        <Flex flexDirection="column" gap={0} alignItems="center">
            <Flex>
                <span>Tournament #{tournament?.id}</span>
            </Flex>
            <Flex>
                <span>will</span>
                <span>start soon</span>
            </Flex>
        </Flex>
    );
};

const TournamentWinner: React.FC<TournamentWinnerProps> = ({ winner }) => {
    const { theme } = useConfig();

    return (
        <TournamentWinnerWrapper>
            <TournamentWinnerHead>
                <span></span>
                <span></span>
            </TournamentWinnerHead>

            <TournamentWinnerContent>
                <Flex alignItems="center">
                    <Icon.Token.Remote path={winner.token?.imageUrl || ''} size={40} />
                    <Flex flexDirection="column" gap={0}>
                        <Text fontSize="16px" lineHeight="1" color={theme.hover}>
                            Winner #{winner.tournament?.id}
                        </Text>
                        <Text fontSize="18px" lineHeight="1" color={theme.bg}>
                            {winner.token?.name}
                        </Text>
                    </Flex>
                </Flex>

                <Flex paddingBottom="2px">
                    <Button.Secondary width="102px" height="34px">
                        Trade
                    </Button.Secondary>
                </Flex>
            </TournamentWinnerContent>
        </TournamentWinnerWrapper>
    );
};

export const BoardWaiting: React.FC<BoardWaitingProps> = ({ tournament }) => {
    const { chainId } = useActiveChainId();

    const { data: launchpad } = useLaunchpad();
    const { data: history } = useHistory({ chainId });

    const winner = useMemo(() => {
        if (!history) return;
        return history?.sort((a, b) => +b.tournament.date - +a.tournament.date)[0];
    }, [history]);

    return (
        <WaitingWrapper>
            <WaitingWrapperContent>
                {winner && (
                    <FadeIn>
                        <TournamentWinner winner={winner} />
                    </FadeIn>
                )}

                <WaitingWrapperTitle>
                    <TournamentId tournament={tournament} />
                </WaitingWrapperTitle>

                <Range pollingToken={launchpad?.poolingToken} />

                <Flex justifyContent="center">
                    <Link href="/launcher">
                        <Button.Primary width="190px">Submit your token</Button.Primary>
                    </Link>
                </Flex>

                <Image src="/img/memes/frog-05.svg" alt="" width={195} height={195} />
            </WaitingWrapperContent>
        </WaitingWrapper>
    );
};
