import { useAccount } from 'wagmi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useQuery } from '@tanstack/react-query';

export const useBackground = () => {
    const { address } = useAccount();
    const [variant] = useLocalStorage(`bg-variant-${address}`, 'default');
    return useQuery({
        queryKey: ['bg-variant', address, variant],
        queryFn: () => {
            if (!address) return 'default';
            return String(localStorage.getItem(`bg-variant-${address}`)).replaceAll('"', '');
        },
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });
};
