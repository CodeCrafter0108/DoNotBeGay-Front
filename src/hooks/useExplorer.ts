import { managers, SupportedChainId } from '@/config/contracts';
import { getGraphClient } from '@/config/graph';
import { Token } from '@/generated/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RefetchInterval } from '@/config/constants';
import { GetExplorerQuery } from '@/graphql/queries/GetExplorerQuery';
import { readContract } from 'wagmi/actions';
import { config as wagmiConfig } from '@/config/wagmi';
import { managerAbi } from '@/config/abis';
import { ExplorerToken } from '@/types/tournament';

// Constants for time calculations
const TIME_MS = {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
} as const;

interface ExplorerQueryProps {
    chainId: SupportedChainId;
}

const isValidTimeframe = (timestamp: number, timeframe: number): boolean => {
    const now = Date.now();
    const date = timestamp * 1000; // Convert to milliseconds

    if (timeframe === TIME_MS.HOUR) {
        const diff = (date - now) / TIME_MS.MINUTE;
        return diff < 60;
    }

    if (timeframe === TIME_MS.DAY) {
        const diff = (date - now) / TIME_MS.HOUR;
        return diff < 24;
    }

    return false;
};

const calculatePriceChange = (
    currentPrice: number,
    lastPrice: number,
): {
    change: number;
    increased: boolean;
    decreased: boolean;
} => {
    if (!lastPrice) return { change: 0, increased: false, decreased: false };

    const diff = currentPrice - lastPrice;
    const changePercent = (diff / lastPrice) * 100;

    return {
        change: Number(changePercent.toFixed(2)),
        increased: diff > 0,
        decreased: diff < 0,
    };
};

const queryFn = async ({ chainId }: ExplorerQueryProps): Promise<ExplorerToken[] | undefined> => {
    const managerAddr = managers[chainId];
    const graphClient = getGraphClient(chainId);

    try {
        const tournamentId = await readContract(wagmiConfig, {
            address: managerAddr,
            abi: managerAbi,
            functionName: 'id',
            chainId,
        });

        const { data } = await graphClient.query<{ tokens: Token[] }>({
            query: GetExplorerQuery,
            variables: { id: String(tournamentId) },
        });

        const tokens = data.tokens.map((token) => {
            const currentPrice = Number(token.priceUSD);
            const { tokenPriceDayData, tokenPriceHourData, tokenDayData } = token;

            // Get latest price data
            const lastHourData = tokenPriceHourData[tokenPriceHourData.length - 1];
            const lastDayData = tokenPriceDayData[tokenPriceDayData.length - 1];

            // Calculate 1h changes
            const hour =
                lastHourData && isValidTimeframe(lastHourData.date, TIME_MS.HOUR)
                    ? calculatePriceChange(currentPrice, Number(lastHourData.priceUSD))
                    : { change: 0, increased: false, decreased: false };

            // Calculate 24h changes
            const day =
                lastDayData && isValidTimeframe(lastDayData.date, TIME_MS.DAY)
                    ? calculatePriceChange(currentPrice, Number(lastDayData.priceUSD))
                    : { change: 0, increased: false, decreased: false };

            // Calculate 24h volume
            const volume24h = tokenDayData.reduce((acc, data) => {
                if (data && isValidTimeframe(data.date, TIME_MS.DAY)) {
                    return acc + Number(data.dailyVolumeUSD);
                }
                return acc;
            }, 0);

            return {
                ...token,
                volume24h,
                changePrice1h: hour.change,
                changePrice24h: day.change,
                changePrice1hIncreased: hour.increased,
                changePrice1hDecreased: hour.decreased,
                changePrice24hIncreased: day.increased,
                changePrice24hDecreased: day.decreased,
            };
        });

        console.log(tokens);

        // Sort tokens by recent price changes
        return tokens.sort((a, b) => {
            const aHasRecentChange = a.changePrice1h !== 0 || a.changePrice24h !== 0;
            const bHasRecentChange = b.changePrice1h !== 0 || b.changePrice24h !== 0;

            if (aHasRecentChange && !bHasRecentChange) return -1;
            if (!aHasRecentChange && bHasRecentChange) return 1;

            return 0;
        });
    } catch (error) {
        console.error('Explorer query failed:', error);
        return undefined;
    }
};

export const useExplorer = (props: ExplorerQueryProps) => {
    return useQuery({
        queryKey: ['use-explorer', props],
        queryFn: () => queryFn(props),
        placeholderData: keepPreviousData,
        refetchInterval: RefetchInterval.FAST,
    });
};
