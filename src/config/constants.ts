export enum ChainId {
    ETHEREUM = 1,
    OPTIMISM = 10,
    BSC = 56,
    POLYGON = 137,
    FANTOM = 250,
    ZKSYNC = 324,
    METIS = 1088,
    KAVA = 2222,
    BASE = 8453,
    AVALANCHE = 43114,
    ARBITRUM = 42161,
    BLAST = 81457,
}

export enum RefetchInterval {
    FAST = 15_000,
    MEDIUM = 30_000,
    SLOW = 60_000,
}

export const SUPPORTED_CHAINS = [ChainId.ARBITRUM] as const;

export const CHAINS_NAME_BY_ID: { [key: number]: string } = {
    [ChainId.ETHEREUM]: 'Ethereum',
    [ChainId.OPTIMISM]: 'Optimism',
    [ChainId.BSC]: 'Binance Smart Chain',
    [ChainId.POLYGON]: 'Polygon',
    [ChainId.FANTOM]: 'Fantom',
    [ChainId.ZKSYNC]: 'zkSync Era',
    [ChainId.METIS]: 'Metis',
    [ChainId.KAVA]: 'Kava',
    [ChainId.BASE]: 'Base',
    [ChainId.AVALANCHE]: 'Avalanche',
    [ChainId.ARBITRUM]: 'Arbitrum',
    [ChainId.BLAST]: 'Blast',
};

export const defiLlamaChainNames: Record<ChainId, string> = {
    [ChainId.ETHEREUM]: 'ethereum',
    [ChainId.OPTIMISM]: 'optimistic-ethereum',
    [ChainId.BSC]: 'bsc',
    [ChainId.POLYGON]: 'polygon-pos',
    [ChainId.FANTOM]: 'fantom',
    [ChainId.ZKSYNC]: 'era',
    [ChainId.METIS]: 'metis',
    [ChainId.KAVA]: 'kava',
    [ChainId.BASE]: 'base',
    [ChainId.AVALANCHE]: 'avalanche',
    [ChainId.ARBITRUM]: 'arbitrum-one',
    [ChainId.BLAST]: 'blast',
};

export const MIN_PARTICIPANTS = 8;
export const MAX_PARTICIPANTS = 256;

export const MAX_INPUT_SYMBOLS = 64;

export const MAX_FILE_SIZE = 200_000; // 200 KB

export const POINTS_FOR_TRADE = 1;
export const POINTS_FOR_DEPLOY = 100_000;

export const LOCAL_STORAGE_KEYS = {
    SHOW_MEMES: 'show-memes',
};
