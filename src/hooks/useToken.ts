import { RefetchInterval } from '@/config/constants';
import { routers, SupportedChainId } from '@/config/contracts';
import { getGraphClient } from '@/config/graph';
import { GetTokenQuery } from '@/graphql/queries/GetTokenQuery';
import { ContractCall, IToken } from '@/types/tournament';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { config as wagmiConfig } from '@/config/wagmi';
import { readContracts } from 'wagmi/actions';
import { tokenAbi } from '@/config/abis';
import { Formatter } from '@/utils';

interface UseTokenQuery {
    chainId: SupportedChainId;
    address?: Address;
    tokenAddress: Address;
}

const queryFn = async ({ chainId, address, tokenAddress }: UseTokenQuery): Promise<IToken | null> => {
    const graphClient = getGraphClient(chainId);
    const routerAddr = routers[chainId];
    const _tokenAddress = String(tokenAddress).toLowerCase();

    try {
        const { data } = await graphClient.query<{ tokens: IToken[] }>({ query: GetTokenQuery, variables: { id: _tokenAddress } });
        if (!data?.tokens) return null;

        const token = data.tokens[0];

        const results = await readContracts(wagmiConfig, {
            contracts: [
                {
                    address: token?.id,
                    abi: tokenAbi,
                    functionName: 'balanceOf',
                    args: [address],
                    chainId,
                },
                {
                    address: token?.id,
                    abi: tokenAbi,
                    functionName: 'allowance',
                    args: [address, routerAddr],
                },
            ] as ContractCall<[Address, Address]>[],
        });

        const allowance = results[1].result as bigint;
        const balanceRaw = (results[0].result || 0n) as bigint;
        const balance = Formatter.bigintToAmount(balanceRaw);
        const balanceUsd = Number(token?.priceUSD) * Number(Formatter.bigintToAmount(balanceRaw));

        return {
            ...token,
            address: token?.id as Address,
            balance,
            isNative: false,
            isWin: false,
            isAvailable: true,
            balanceUsd,
            balanceRaw,
            allowance,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const useToken = (props: UseTokenQuery) => {
    return useQuery({
        queryKey: ['use-token', props.address, props.chainId, props.tokenAddress],
        queryFn: () => queryFn(props),
        enabled: !!props.address && !!props.tokenAddress,
        refetchInterval: RefetchInterval.FAST,
        placeholderData: keepPreviousData,
    });
};
