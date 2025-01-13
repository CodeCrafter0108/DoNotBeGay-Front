import { managerAbi } from '@/config/abis';
import { RefetchInterval } from '@/config/constants';
import { managers, SupportedChainId } from '@/config/contracts';
import { getGraphClient } from '@/config/graph';
import { Token, Tournament } from '@/generated/types';
import { GetTournamentsQuery } from '@/graphql/queries/GetTournamentsQuery';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { config as wagmiConfig } from '@/config/wagmi';
import { readContracts } from 'wagmi/actions';
import { ContractCall, IHistoryItem } from '@/types/tournament';

interface HistoryQuery {
    chainId: SupportedChainId;
}

const queryFn = async ({ chainId }: HistoryQuery): Promise<IHistoryItem[] | undefined> => {
    const managerAddr = managers[chainId];
    const graphClient = getGraphClient(chainId);

    const params = {
        query: GetTournamentsQuery,
    };

    try {
        const { data } = await graphClient.query<{ tournaments: Tournament[] }>(params);
        console.log("🚀 ~ queryFn ~ data:", data)
        const tournaments = data?.tournaments || [];

        const calls = tournaments.map((tournament) => {
            return {
                address: managerAddr,
                abi: managerAbi,
                functionName: 'getWinningToken',
                args: [BigInt(tournament.id)],
            };
        }) as ContractCall<[bigint]>[];

        const results = (await readContracts(wagmiConfig, { contracts: calls })).filter(({ result }) => result);
        console.log("🚀 ~ queryFn ~ results:", results)

        return results
            .map(({ result }, i) => {
                const tokenAddress = String(result).toLowerCase() as Address;
                const token = tournaments[i].tokens.find((token) => token?.id.toLowerCase() === tokenAddress) as Token;
                return { token, tournament: tournaments[i] };
            })
            .reverse();
    } catch (error) {
        console.error(error);
    }
};

export const useHistory = (query: HistoryQuery) => {
    return useQuery({
        queryKey: ['use-history', query],
        queryFn: () => queryFn(query),
        refetchInterval: RefetchInterval.FAST,
        placeholderData: keepPreviousData,
    });
};
