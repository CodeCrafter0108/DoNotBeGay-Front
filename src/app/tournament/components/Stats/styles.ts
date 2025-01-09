import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const StatsWrapper = styled.div<{ compact?: boolean }>`
    display: flex;
    align-items: ${({ compact }) => (compact ? 'flex-start' : 'center')};
    justify-content: ${({ compact }) => (compact ? 'space-between' : 'space-between')};
    flex-direction: ${({ compact }) => (compact ? 'column' : 'row')};
    padding: 30px 40px;
    width: 100%;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 20px;
        flex-direction: column;
    }
`;

export const StatsItems = styled.div<{ compact?: boolean }>`
    display: flex;
    justify-content: space-between;
    flex: 1.5;
    width: 100%;

    @media screen and (max-width: ${Breakpoints.md}) {
        flex-direction: column;
        gap: 15px;
    }
`;
