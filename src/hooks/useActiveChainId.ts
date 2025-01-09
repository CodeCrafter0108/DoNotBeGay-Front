import { useAccount } from 'wagmi';
import { SUPPORTED_CHAINS } from '@/config/constants';
import { SupportedChainId } from '@/config/contracts';
import { useQuery } from '@tanstack/react-query';

export const useActiveChainId = () => {
    const { chainId, isConnected, address } = useAccount();

    const { data } = useQuery({
        queryKey: ['use-active-chain-id', chainId, isConnected, address],
        queryFn: () => {
            if (!isConnected || !chainId) {
                return SUPPORTED_CHAINS[0] as SupportedChainId;
            }

            if (!SUPPORTED_CHAINS.includes(chainId)) {
                return SUPPORTED_CHAINS[0] as SupportedChainId;
            }

            return chainId as SupportedChainId;
        },
    });

    return { chainId: data || (SUPPORTED_CHAINS[0] as SupportedChainId) };
};
