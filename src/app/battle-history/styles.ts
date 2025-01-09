import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const BattleHistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const BattleHistoryCards = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media screen and (max-width: ${Breakpoints.md}) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
