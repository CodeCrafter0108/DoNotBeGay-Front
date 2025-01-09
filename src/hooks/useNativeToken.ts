import { RefetchInterval } from '@/config/constants';
import { SupportedChainId } from '@/config/contracts';
import { getNativeToken } from '@/utils/tokens';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Address } from 'viem';

interface UseNativeTokenQuery {
    chainId: SupportedChainId;
    address?: Address;
}

export const useNativeToken = (query: UseNativeTokenQuery) => {
    return useQuery({
        queryKey: ['use-native-token', query],
        queryFn: () => getNativeToken(query.chainId, query.address),
        refetchInterval: RefetchInterval.FAST,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};
