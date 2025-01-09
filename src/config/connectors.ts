import { createConnector } from 'wagmi';
import { injected } from 'wagmi/connectors';

export enum NetworkProviders {
    INJECTED = 'injected',
    COINBASE_WALLET = 'coinbaseWalletSDK',
    WALLET_CONNECT = 'walletConnect',
}

export const SupportedConnectors = [NetworkProviders.INJECTED, NetworkProviders.COINBASE_WALLET];

export function injectedWithFallback() {
    return createConnector((config) => {
        const injectedConnector = injected()(config);

        return {
            ...injectedConnector,
            connect(...params) {
                if (window && !window.ethereum) {
                    window.open('https://metamask.io/', 'inst_metamask');
                }
                return injectedConnector.connect(...params);
            },
            get name() {
                return 'Injected';
            },
        };
    });
}
