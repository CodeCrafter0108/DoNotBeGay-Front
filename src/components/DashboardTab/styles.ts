import styled from 'styled-components';
import { DashboardTabWrapperProps } from './types';

export const DashboardTabWrapper = styled.div<DashboardTabWrapperProps>`
    height: 36px;
    font-size: 20px;

    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 4px;

    color: ${({ active, theme }) => (active ? theme.bg : theme.gray)};
    background: ${({ active, theme }) => (active ? theme.accent : 'transparent')};

    &:hover {
        cursor: pointer;
    }
`;
