import styled from 'styled-components';
import { ModalBaseWrapper } from '../styles';

export const ModalConnectWrapper = styled(ModalBaseWrapper)`
    gap: 30px;
`;

export const ConnectorsWrapper = styled.div`
    display: grid;
    gap: 10px;
    min-width: 300px;

    button {
        padding: 10px;
    }
`;

export const ConnectorItem = styled.div`
    display: flex;
    width: 100%;
    transition: all 0.3s ease;

    &:hover {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
    }
`;
