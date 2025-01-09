import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const TournamentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 326px 326px;
    gap: 20px;
    min-height: 482px;
    position: relative;

    @media screen and (max-width: ${Breakpoints.lg}) {
        grid-template-columns: 1fr;
        min-height: unset;
    }
`;
