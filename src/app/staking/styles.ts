import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const LayoutWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media screen and (width < ${Breakpoints.lg}) {
        grid-template-columns: 1fr;
        gap: 10px;
    }
`;

export const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.75fr 1fr;
    gap: 16px;

    @media screen and (width < ${Breakpoints.lg}) {
        grid-template-columns: 1fr;
        gap: 10px;
    }
`;
