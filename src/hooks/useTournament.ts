import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { managers, wrappedTokens } from '@/config/contracts';
import { Formatter, getNativeToken, getTournamentTokens, multicall, tokensIsEqual } from '@/utils';
import { managerAbi } from '@/config/abis';
import {
    Bracket,
    GetAvailableTokensProps,
    GetPoolPrizeProps,
    GetTokensProps,
    GetTournamentResponse,
    IToken,
    ITournament,
    ITournamentResponse,
    TournamentBracketProps,
    GetTournamentProps,
    TournamentQueryProps,
} from '@/types/tournament';
import { getGraphClient } from '@/config/graph';
import { config as wagmiConfig } from '@/config/wagmi';
import { Address } from 'viem';
import { readContract } from 'wagmi/actions';
import { Pair, Token, Tournament } from '@/generated/types';
import { GetTournamentQuery } from '@/graphql/queries/GetTournamentQuery';
import { RefetchInterval } from '@/config/constants';

/**
 * Get total prize of the tournament
 * @notice Based on the total reserves of the pairs
 */
const getTotalPrize = ({ pairs, nativeToken, chainId }: GetPoolPrizeProps): number => {
    const reservesRaw = pairs.reduce((acc, pair) => {
        const reserve0 = BigInt(pair?.reserve0 || '0');
        const reserve1 = BigInt(pair?.reserve1 || '0');
        const reserve = tokensIsEqual(pair?.token0?.id as Address, wrappedTokens[chainId].address) ? reserve0 : reserve1;
        return acc + reserve;
    }, 0n);

    const reservesETH = Formatter.bigintToAmount(reservesRaw);
    return Number(reservesETH) * Number(nativeToken.priceUSD);
};

const getAvailableTokens = ({ bracket, round }: GetAvailableTokensProps): IToken[] => {
    const currentBracket = bracket[round] || [];
    const bracketTokens = currentBracket.flat();
    const uniqAddresses = Array.from(new Set(bracketTokens.map((token) => token?.id))).filter((token) => token);
    return uniqAddresses.map((address) => bracketTokens.find((token) => token?.id === address)) as IToken[];
};

const getTokens = ({ tournamentTokens, availableTokens }: GetTokensProps): IToken[] => {
    // check if the token is available (exists in the availableTokens)
    return tournamentTokens.map((token) => {
        const availableToken = availableTokens.find((availableToken) => availableToken?.id === token.id);
        return { ...token, isAvailable: !!availableToken };
    });
};

/**
 * Get tournament data from the graph
 * @notice Add native token, total prize, tokens and bracket data
 */
const getTournament = async (props: GetTournamentProps): Promise<GetTournamentResponse | undefined> => {
    const { chainId, address, tournamentId, round, lastRound } = props;
    const graphClient = getGraphClient(chainId);

    try {
        const nativeToken = await getNativeToken(chainId, address);

        const params = {
            query: GetTournamentQuery,
            variables: { id: String(tournamentId) },
        };

        const { data } = await graphClient.query<{ tournament: Tournament }>(params);

        const pairsList = (data.tournament?.pairs as Pair[]) || [];
        const tokensList = (data.tournament?.tokens as Token[]) || [];

        const totalPrize = getTotalPrize({ pairs: pairsList, nativeToken, chainId });
        const tournamentTokens = await getTournamentTokens({ tokens: tokensList, chainId, address });
        const bracket = await getBracket({ chainId, tournamentId, lastRound, tournamentTokens });

        const availableTokens = getAvailableTokens({ bracket, round });
        const tokens = getTokens({ tournamentTokens, availableTokens });

        return { ...data.tournament, nativeToken, tokens, bracket, totalPrize };
    } catch (error) {
        console.error(error);
    }
};

/**
 * Get bracket data from the contract
 * @notice Get bracket data from the contract and fill it with tokens
 */
const getBracket = async ({ chainId, tournamentId, lastRound, tournamentTokens }: TournamentBracketProps) => {
    const managerAddr = managers[chainId];

    try {
        const params = {
            address: managerAddr,
            functionName: 'getBracket',
            args: [tournamentId],
            abi: managerAbi,
            chainId,
        } as const;

        const bracket = [];
        const bracketArr = await readContract(wagmiConfig, { ...params });
        const splitRounds = splitArrayRounds([...bracketArr], Number(lastRound));

        // fill the bracket with tokens by token.position
        for (const round of splitRounds) {
            const roundTokens = round.map((index) => {
                if (index === 255) return undefined;

                const token = tournamentTokens.find((token) => +token.position === index);
                if (!token) return undefined;

                const nextRound = splitRounds[splitRounds.indexOf(round) + 1] || [];
                const isWin = nextRound.includes(index);

                return { ...token, isWin };
            });
            bracket.push(roundTokens);
        }

        // split the bracket into pairs
        const result = [];
        for (const round of bracket) {
            const pairs = [];
            for (let i = 0; i < round.length; i += 2) {
                pairs.push([round[i], round[i + 1]]);
            }
            result.push(pairs);
        }

        return result as Bracket;
    } catch (error) {
        console.error('Error in getBracket:', error);
        return [];
    }
};

/**
 * Split array into rounds
 * @notice Split array into rounds by half
 */
const splitArrayRounds = (arr: number[], rounds: number): number[][] => {
    const result: number[][] = [];
    let currentArray = arr;

    for (let i = 0; i < rounds; i++) {
        const splitSize = Math.ceil(currentArray.length / 2);
        result.push(currentArray.slice(0, splitSize));
        currentArray = currentArray.slice(splitSize);
        if (currentArray.length === 0) break;
    }

    return result;
};

// Get tournament data
const queryFn = async ({ chainId, address }: TournamentQueryProps): Promise<ITournament | undefined> => {
    const managerAddr = managers[chainId];

    try {
        const { tournamentId, round, lastRound, isTournamentActive } = (await multicall({
            calls: ['tournamentId-id', 'round', 'lastRound', 'isTournamentActive'],
            contract: managerAddr,
            abi: managerAbi,
            chainId,
        })) as unknown as ITournamentResponse;

        const _round = Number(round);
        const _lastRound = Number(lastRound);

        const tournament = await getTournament({ chainId, address, tournamentId, round: _round, lastRound: _lastRound });

        return {
            ...tournament,
            id: Number(tournamentId),
            round: _round,
            lastRound: _lastRound,
            isTournamentActive,
        } as ITournament;
    } catch (error) {
        console.error(error);
    }
};

export const useTournament = (query: TournamentQueryProps) => {
    return useQuery({
        queryKey: ['use-tournament', query],
        queryFn: () => queryFn(query),
        refetchInterval: RefetchInterval.FAST,
        placeholderData: keepPreviousData,
    });
};
