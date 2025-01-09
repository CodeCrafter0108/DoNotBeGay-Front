import { useAccount } from 'wagmi';
import { SUPPORTED_CHAINS } from '@/config/constants';

export const useIsValidChain = () => {
    const { chainId, isConnected } = useAccount();

    if (!isConnected || !chainId) {
        return {
            data: false,
            chainId,
        };
    }

    return {
        data: SUPPORTED_CHAINS.includes(chainId),
        chainId,
    };
};
