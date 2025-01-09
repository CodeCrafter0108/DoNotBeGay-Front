import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const TokensDeployedWrapper = styled.div`
    overflow-y: auto;
    height: 100%;

    display: grid;
    grid-template-rows: auto 1fr;

    @media screen and (width < ${Breakpoints.md}) {
        height: max-content;
    }
`;
