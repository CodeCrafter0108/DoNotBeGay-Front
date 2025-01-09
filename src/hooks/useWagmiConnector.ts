import { Connector, disconnect as wagmiDisconnect } from '@wagmi/core';
import { useConnect } from 'wagmi';
import { config as wagmiConfig } from '@/config/wagmi';

export const useWagmiConnector = () => {
    const { connect: wagmiConnect, connectors } = useConnect();

    const connect = (connector: Connector) => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            wagmiConnect({ connector });
        } else {
            connector.connect();
        }
    };

    const disconnect = () => {
        wagmiDisconnect(wagmiConfig);
    };

    return { connect, disconnect, connectors };
};
