import { ChainId, SUPPORTED_CHAINS } from '@/config/constants';
import { Address } from 'viem';

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number];

type AddressMap = {
    [K in SupportedChainId]: Address;
};

type AddressMapWithSymbol = {
    [K in SupportedChainId]: {
        address: Address;
        symbol: string;
        name: string;
        decimals: number;
    };
};

export const launchpads: AddressMap = {
    [ChainId.ARBITRUM]: '0xF11DcbbFF6f72c8217F3Ce27F7668B2C8C1f391d',
} as const;

export const routers: AddressMap = {
    [ChainId.ARBITRUM]: '0xFF0F03CC67cE9e2F8340f1833aA3F7cB457b5767',
} as const;

export const managers: AddressMap = {
    [ChainId.ARBITRUM]: '0xf21f0D9621Ca70f4fA63B24aE182c2C049629dF0',
} as const;

export const migrations: AddressMap = {
    [ChainId.ARBITRUM]: '0x8e9E846E9776536367214124fDdf974E8005472F',
} as const;

// Native token price from oracles
export const oracles: AddressMap = {
    [ChainId.ARBITRUM]: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
} as const;

export const wrappedTokens: AddressMapWithSymbol = {
    [ChainId.ARBITRUM]: {
        address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        symbol: 'ETH',
        name: 'Ether',
        decimals: 18,
    },
} as const;
