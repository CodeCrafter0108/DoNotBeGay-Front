import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const ModalLiquidityWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    position: relative;

    @media screen and (max-width: ${Breakpoints.md}) {
        gap: 20px;
        width: 310px;

        img {
            width: 110px;
        }
    }
`;

export const ModalLiquidityTextWrapper = styled.div`
    width: 300px;

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 100%;
    }
`;
