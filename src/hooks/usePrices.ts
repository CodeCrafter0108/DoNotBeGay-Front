import { apiClient } from '@/config/api';
import { ChainId, defiLlamaChainNames, RefetchInterval } from '@/config/constants';
import { SupportedChainId } from '@/config/contracts';
import { keepPreviousData, QueryClient, useQuery } from '@tanstack/react-query';
import { Address, getAddress } from 'viem';
import { getNativePrice } from '@/utils/prices';

interface QueryProps {
    chainId: ChainId;
    addresses: Address[];
}

interface TokenPricesResponse {
    [address: Address]: {
        usd: number;
    };
}

interface TokenPrices {
    [address: Address]: number;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 300_000, // 5 minutes
        },
    },
});

const queryFn = async ({ chainId, addresses }: QueryProps) => {
    const baseURL = process.env.NEXT_PUBLIC_COIN_GECKO_API_URI;
    const key = process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY;
    const asset = defiLlamaChainNames[chainId];

    const keyValue = addresses.reduce(
        (acc, address) => {
            acc[address] = 0;
            return acc;
        },
        {} as Record<Address, number>,
    );

    const queryKey = ['tokenPrices', keyValue, chainId];
    const cached = queryClient.getQueryData(queryKey);

    if (cached) {
        return cached as TokenPrices;
    }

    const url = new URL(`${baseURL}/simple/token_price/${asset}`);
    url.searchParams.append('contract_addresses', addresses.join(','));
    url.searchParams.append('vs_currencies', 'usd');

    try {
        const data = (await apiClient.get(url.toString(), { headers: { 'x-cg-api-key': key } })) as TokenPricesResponse;

        const prices = Object.fromEntries(Object.entries(data).map(([address, value]) => [getAddress(address), value.usd])) as TokenPrices;

        const newKey = ['tokenPrices', prices, chainId];

        queryClient.setQueryData(queryKey, newKey);

        return prices;
    } catch (error) {
        console.error('Failed to fetch prices', error);
    }
};

export const useCoinGeckoPrices = (chainId: ChainId, addresses: Address[]) => {
    return useQuery({
        queryKey: ['usePrices', { chainId, addresses }],
        queryFn: async () => {
            if (!addresses.length || !chainId) return {};
            return queryFn({ chainId, addresses });
        },
        enabled: !!addresses.length,
    });
};

export const useNativePrice = (chainId: SupportedChainId) => {
    return useQuery({
        queryKey: ['useNativePrice', chainId],
        queryFn: () => getNativePrice({ chainId }),
        enabled: !!chainId,
        placeholderData: keepPreviousData,
        refetchInterval: RefetchInterval.FAST,
    });
};
