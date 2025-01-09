import { useAccount } from 'wagmi';
import { ChainId, RefetchInterval } from '@/config/constants';
import { normalize } from 'viem/ens';
import { getViemPublicClient } from '@/config/wagmi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { User } from '@/types';
import { Formatter } from '@/utils/formatter';

const queryFn = async (address?: Address): Promise<User | undefined> => {
    const client = getViemPublicClient({ chainId: ChainId.ETHEREUM });

    if (!address) {
        return;
    }

    const _name = Formatter.formatAddress(address);

    try {
        const ensName = (await client.getEnsName({ address })) || '';

        const ensAvatar =
            (await client.getEnsAvatar({
                name: normalize(ensName || ''),
            })) || '';

        const name = ensName || _name;

        return { name, avatar: ensAvatar };
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return { name: _name, avatar: '' };
    }
};

export const useUser = () => {
    const { address } = useAccount();

    return useQuery({
        queryKey: ['use-user-data', address],
        queryFn: () => queryFn(address),
        enabled: !!address,
        refetchInterval: RefetchInterval.SLOW,
        placeholderData: keepPreviousData,
    });
};
