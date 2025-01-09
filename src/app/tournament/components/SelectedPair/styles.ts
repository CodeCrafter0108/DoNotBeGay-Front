import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const SelectedPairWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    height: auto;

    @media screen and (width < ${Breakpoints.lg}) {
        grid-template-columns: 1fr;
    }
`;
