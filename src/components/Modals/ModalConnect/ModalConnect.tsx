import React from 'react';
import { Flex, Grid, Text } from '@/styles/global';

import { Icon } from '@/components/Icon';
import { NetworkProviders, SupportedConnectors } from '@/config/connectors';
import { Connector } from 'wagmi';
import { ConnectorItem, ConnectorsWrapper, ModalConnectWrapper } from './styles';
import { useModal } from '@/contexts/ModalContext';
import Image from 'next/image';
import { useWagmiConnector } from '@/hooks/useWagmiConnector';

interface Props {
    onClose?: () => void;
}

export const WalletOptions: React.FC<Props> = ({ onClose }) => {
    const { connect, connectors } = useWagmiConnector();

    const supportedConnectors = connectors.filter((connector) => SupportedConnectors.includes(connector.id as NetworkProviders));

    const handleConnect = (connector: Connector) => {
        connect(connector);
        onClose && onClose();
    };

    return (
        <ConnectorsWrapper>
            <Grid gap={15}>
                {supportedConnectors.map((connector) => (
                    <ConnectorItem key={connector.uid} onClick={() => handleConnect(connector)}>
                        <Flex gap={10} alignItems="center">
                            <Flex alignItems="center" justifyContent="center" height="100%">
                                {Icon.Connector({ connector, size: 40 })}
                            </Flex>
                            <Text fontSize="16px" fontWeight="600" color="#fff">
                                {connector.name}
                            </Text>
                        </Flex>
                    </ConnectorItem>
                ))}
            </Grid>
        </ConnectorsWrapper>
    );
};

export const ModalConnect: React.FC<Props> = () => {
    const { closeModal } = useModal();

    return (
        <ModalConnectWrapper>
            <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="28px" fontWeight="500" lineHeight="0.5">
                    Connect wallet
                </Text>
                <Flex cursor="pointer" onClick={closeModal}>
                    <Image src="/img/icons/close.svg" alt="Close" width={14} height={14} />
                </Flex>
            </Flex>
            <WalletOptions onClose={closeModal} />
        </ModalConnectWrapper>
    );
};

export default ModalConnect;
