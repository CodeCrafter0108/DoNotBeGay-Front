import React from 'react';
import { NetworkProviders } from '@/config/connectors';
import { ConnectorIconProps } from './types';
import { DEFAULT_ICON_SIZE } from './config';
import Image from 'next/image';

// IconConnector component for displaying the connector icon (Metamask, Coinbase, WalletConnect)
export const IconConnector: React.FC<ConnectorIconProps> = ({ connector, size = DEFAULT_ICON_SIZE }) => {
    const { id } = connector || { id: null };

    switch (id) {
        case NetworkProviders.INJECTED:
            return <Image src={'/img/connectors/metamask.svg'} alt="Metamask" width={size} height={size} />;
        case NetworkProviders.COINBASE_WALLET:
            return <Image src={'/img/connectors/coinbase.svg'} alt="Metamask" width={size} height={size} />;
        case NetworkProviders.WALLET_CONNECT:
            return <Image src={'/img/connectors/walletconnect.svg'} alt="Metamask" width={size} height={size} />;
        default:
            return null;
    }
};
