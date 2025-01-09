import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const TokensOwnedWrapper = styled.div`
    overflow-y: auto;
    height: 100%;

    display: grid;
    grid-template-rows: auto 1fr;

    @media screen and (width < ${Breakpoints.md}) {
        height: max-content;
    }
`;

export const TokensOwnedItem = styled.div<{ available?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-right: 35px;

    opacity: ${({ available }) => (available ? 1 : 0.5)};
    pointer-events: ${({ available }) => (available ? 'auto' : 'none')};
`;
