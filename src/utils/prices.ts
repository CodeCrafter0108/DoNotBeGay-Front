import { oracleAbi } from '@/config/abis';
import { oracles, SupportedChainId } from '@/config/contracts';
import { readContract } from 'wagmi/actions';
import { Formatter } from './formatter';
import { config as wagmiConfig } from '@/config/wagmi';

interface NativePriceProps {
    chainId: SupportedChainId;
}

export const getNativePrice = async ({ chainId }: NativePriceProps) => {
    const oracle = oracles[chainId];

    try {
        const res = await readContract(wagmiConfig, {
            address: oracle,
            abi: oracleAbi,
            functionName: 'latestAnswer',
            chainId,
        });

        const price = Number(Formatter.bigintToAmount(res, 8));
        const priceRaw = Formatter.amountToBigint(price);

        return { price, priceRaw };
    } catch (error) {
        console.error(error);
    }
};
