import { expect, test } from 'vitest';
import { readContract } from 'wagmi/actions';
import { config as wagmiConfig } from '@/config/wagmi';
import { pairAbi } from '@/config/abis/pairAbi';
import { Address, formatUnits } from 'viem';
import { ChainId } from '@/config/constants';
import { wrappedTokens } from '@/config/contracts';
import { tokensIsEqual } from '@/utils';
import { pairs } from '@/common/mock';

test('Getting all pool reserves', async () => {
    const chainId = ChainId.ARBITRUM;
    const ethPriceUSD = 2517;

    const promises = pairs.map(async (pair) => {
        const weth = wrappedTokens[chainId];
        const token0Address = pair.token0.id as Address;

        const [reserve0, reserve1] = await readContract(wagmiConfig, {
            address: pair.id as Address,
            abi: pairAbi,
            functionName: 'getReserves',
            chainId,
        });

        const reserve = tokensIsEqual(token0Address, weth.address) ? reserve0 : reserve1;
        const reserveUSD = Number(formatUnits(reserve, 18)) * ethPriceUSD;
        return [pair.id, reserveUSD] as [string, number];
    });

    const reserves = await Promise.all(promises);
    const totalReservesUSD = reserves.reduce((acc, reserve) => acc + reserve[1], 0);
    console.debug({ totalReservesUSD });

    const isAllReservesHasValue = reserves.every((reserve) => reserve[1] > 0);

    expect(reserves.length).toBe(pairs.length);
    expect(isAllReservesHasValue).toBe(true);
});

test('Getting reserves for a specific pool', async () => {
    const chainId = ChainId.ARBITRUM;
    const ethPriceUSD = 2517;

    const weth = wrappedTokens[chainId];
    const pair = {
        id: '0x2c04f4f49add4b07435951e7048a4b33239ca367',
        token0: {
            id: '0x5bc2397dca2e5a72b49285edf7bef54ca9b522e6',
        },
        token1: {
            id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // WETH
        },
    };

    const token0Address = pair.token0.id as Address;

    const [reserve0, reserve1] = await readContract(wagmiConfig, {
        address: pair.id as Address,
        abi: pairAbi,
        functionName: 'getReserves',
        chainId,
    });

    const reserve = tokensIsEqual(token0Address, weth.address) ? reserve0 : reserve1;
    const reserveUSD = Number(formatUnits(reserve, 18)) * ethPriceUSD;
    console.debug({ reserveUSD, reserve, reserve0, reserve1 });

    expect(reserveUSD).toBeGreaterThan(0);
});
