import { createConfig, http } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { ChainId } from '@/config/constants';
import { createPublicClient, fallback } from 'viem';
import { arbitrum, mainnet } from 'viem/chains';
import { injectedWithFallback } from './connectors';

interface GetViemPublicClient {
    chainId: ChainId;
}

export const config = createConfig({
    ssr: true,
    chains: [mainnet, arbitrum],
    transports: {
        [mainnet.id]: http(),
        [arbitrum.id]: http(),
    },
    batch: {
        multicall: {
            batchSize: 1024 * 200,
            wait: 16,
        },
    },
    connectors: [
        injectedWithFallback(),
        coinbaseWallet({
            appName: 'Awakeness',
            darkMode: true,
        }),
    ],
});

export const getViemPublicClient = ({ chainId }: GetViemPublicClient) => {
    const chain = config.chains.find((c) => c.id === chainId)!;

    if (!chain) {
        throw new Error(`Chain with id ${chainId} not found`);
    }

    return createPublicClient({
        chain,
        transport: fallback(
            chain?.rpcUrls.default.http.map((url) => http(url, { timeout: 10_000 })),
            { rank: false },
        ),
        batch: {
            multicall: {
                batchSize: 1024 * 200,
                wait: 16,
            },
        },
        pollingInterval: 6_000,
    });
};
