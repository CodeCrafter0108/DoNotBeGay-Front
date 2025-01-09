import { routerAbi } from '@/config/abis';
import { ChainId } from '@/config/constants';
import { routers } from '@/config/contracts';
import { AmountType } from '@/types';
import { Address } from 'viem';
import { IToken } from '@/types/tournament';
import { useReadContract } from 'wagmi';

interface AmountsProps {
    amount: bigint;
    type: AmountType;
    fromToken?: Partial<IToken>;
    toToken?: Partial<IToken>;
}

export const useAmounts = ({ amount, type, fromToken, toToken }: AmountsProps) => {
    const routerAddr = routers[ChainId.ARBITRUM];
    const path = type === AmountType.IN ? [fromToken?.address, toToken?.address] : [toToken?.address, fromToken?.address];

    const { data } = useReadContract({
        address: routerAddr,
        functionName: 'getAmountsOutWithFee',
        abi: routerAbi,
        args: [amount, path as Address[]],
    });

    return { data: data ? data[1] : 0n };
};
