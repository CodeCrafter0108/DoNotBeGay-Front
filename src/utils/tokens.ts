import { Address, getAddress, zeroAddress } from 'viem';
import { routers, SupportedChainId, wrappedTokens } from '@/config/contracts';
import { ContractCall, GetTournamentTokensProps, IToken } from '@/types/tournament';
import { getBalance, readContracts } from 'wagmi/actions';
import { config as wagmiConfig } from '@/config/wagmi';
import { Formatter } from '@/utils/formatter';
import { getNativePrice } from '@/utils/prices';
import { tokenAbi } from '@/config/abis';

export const tokensIsEqual = (t0: Address, t1: Address) => {
    return getAddress(t0) === getAddress(t1);
};

export const getNativeToken = async (chainId: SupportedChainId, userAddress?: Address): Promise<IToken> => {
    const { name, symbol, address, decimals } = wrappedTokens[chainId];

    const { price: priceData, priceRaw } = (await getNativePrice({ chainId })) || { price: 0, priceRaw: 0n };
    const { value } = await getBalance(wagmiConfig, { address: userAddress || zeroAddress, chainId });

    const allowance = 0n;
    const balanceRaw = value as bigint;

    const priceUsd = String(priceData || 0);

    const balance = Formatter.bigintToAmount(balanceRaw);
    const balanceUsd = Number(priceUsd) * Number(Formatter.bigintToAmount(balanceRaw));

    return {
        id: name,
        symbol,
        address,
        decimals: `${decimals}`,
        imageUrl: `/img/tokens/${chainId}.svg`,
        priceUSD: priceUsd,
        priceETH: priceRaw.toString(),
        balance,
        balanceUsd,
        balanceRaw,
        allowance,
        name,
        isNative: true,
        position: '0',
        tokenDayData: [],
        tokenHourData: [],
        tokenPriceDayData: [],
        tokenPriceHourData: [],
        totalLiquidityUSD: '0',
        totalSupply: '0',
        tradeVolume: '0',
        tradeVolumeUSD: '0',
        txCount: '0',
        tournament: null as any,
        tournamentId: '0',
        isWin: false,
        isAvailable: true,
    };
};

export const getTournamentTokens = async ({ tokens, chainId, address }: GetTournamentTokensProps): Promise<IToken[]> => {
    const routerAddr = routers[chainId];

    const results = await readContracts(wagmiConfig, {
        contracts: tokens.flatMap((token) => [
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
                chainId,
            },
        ]) as ContractCall<[Address, Address]>[],
    });

    return tokens.map((token, index) => {
        const balanceIndex = index * 2;
        const allowance = results[balanceIndex + 1].result as bigint;
        const balanceRaw = (results[balanceIndex].result || 0n) as bigint;
        const balance = Formatter.bigintToAmount(balanceRaw);
        const balanceUsd = Number(token?.priceUSD) * Number(Formatter.bigintToAmount(balanceRaw));

        return { ...token, address: token?.id as Address, balance, isNative: false, isWin: false, isAvailable: true, balanceUsd, balanceRaw, allowance };
    });
};
