import styled from 'styled-components';
import { HealthWrapperProps } from './types';

export const HealthWrapper = styled.div<HealthWrapperProps>`
    position: fixed;
    right: 10px;
    bottom: 10px;

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: ${({ alive }) => (alive ? 'green' : 'red')};
`;
