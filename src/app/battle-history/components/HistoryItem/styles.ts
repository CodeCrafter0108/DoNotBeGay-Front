import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const HistoryItemWrapper = styled.div`
    position: relative;
    height: 146px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid ${({ theme }) => theme.accent};

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.bg};
        z-index: -1;
    }
`;

export const HistoryItemBadge = styled.div`
    width: 160px;
    height: 34px;
    clip-path: polygon(90% 0%, 100% 0, 90% 50%, 100% 100%, 0 100%, 0 50%, 0 0);

    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.bg};

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HistoryItemContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 40px 0 40px;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 15px 15px 0 15px;
    }
`;
