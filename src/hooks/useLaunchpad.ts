import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { launchpads } from '@/config/contracts';
import { ChainId, RefetchInterval } from '@/config/constants';
import { Formatter, multicall } from '@/utils';
import { launchpadAbi } from '@/config/abis';
import { ILaunchpad, ILaunchpadResponse } from '@/types/launchpad';

const queryFn = async (): Promise<ILaunchpad | undefined> => {
    const launchpadAddr = launchpads[ChainId.ARBITRUM];

    try {
        const { poolingToken, poolingTournament, INITIAL_LIQ } = (await multicall({
            calls: ['poolingToken', 'poolingTournament', 'INITIAL_LIQ'],
            contract: launchpadAddr,
            chainId: ChainId.ARBITRUM,
            abi: launchpadAbi,
        })) as ILaunchpadResponse;

        const _poolingToken = Number(poolingToken);
        const _poolingTournament = Number(poolingTournament);

        const currentThresholdIndex = Formatter.getThresholdIndex(_poolingToken);

        const currentThreshold = Formatter.getThresholdByIndex(currentThresholdIndex - 1) || 0;
        const nextThreshold = Formatter.getThresholdByIndex(currentThresholdIndex);

        const tokensPending = _poolingToken - currentThreshold;
        const tokensRequired = nextThreshold - _poolingToken;

        return {
            poolingToken: _poolingToken,
            poolingTournament: _poolingTournament,
            INITIAL_LIQ,
            currentThreshold,
            nextThreshold,
            tokensSubmitted: _poolingToken,
            tokensConfirmed: currentThreshold,
            tokensPending,
            tokensRequired,
        };
    } catch (error) {
        console.error(error);
    }
};

export const useLaunchpad = () => {
    return useQuery({
        queryKey: ['use-launchpad'],
        queryFn: () => queryFn(),
        refetchInterval: RefetchInterval.MEDIUM,
        placeholderData: keepPreviousData,
    });
};
