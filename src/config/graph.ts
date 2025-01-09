import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ChainId } from './constants';

export const LAUNCHPAD_GRAPH: Record<number, string> = {
    [ChainId.ARBITRUM]: 'https://api.studio.thegraph.com/query/71356/awakeness-factory/version/latest',
};

export const getGraphClient = (chainId: ChainId) => {
    const uri = LAUNCHPAD_GRAPH[chainId];

    return new ApolloClient({
        uri,
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
                errorPolicy: 'all',
            },
            query: {
                fetchPolicy: 'network-only',
                errorPolicy: 'all',
            },
        },
    });
};
