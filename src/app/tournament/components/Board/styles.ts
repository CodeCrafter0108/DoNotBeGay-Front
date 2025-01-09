import styled from 'styled-components';
import { BoardPrimaryPairsProps } from '@/app/tournament/components/Board/types';
import { Breakpoints } from '@/styles/breakpoints';

const OFFSET = 26;

export const PrimaryWrapper = styled.div`
    gap: 104px;
    padding: 0 60px 30px 40px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 0 20px 30px 20px;
        gap: 14px;
    }
`;

export const PrimaryPairs = styled.div<BoardPrimaryPairsProps>`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    gap: ${({ offset }) => (offset ? offset * OFFSET : 34)}px;
    padding: ${({ padding }) => padding || 0};

    @media screen and (max-width: ${Breakpoints.md}) {
        padding-right: 0;
    }
`;

export const SecondaryWrapper = styled.div`
    padding: 0 40px 30px 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
    grid-row-gap: 12px;
    justify-content: space-between;

    @media screen and (max-width: ${Breakpoints.md}) {
        grid-template-columns: 1fr;
    }
`;

export const WaitingWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    border-radius: 12px;
`;

export const WaitingWrapperContent = styled.div`
    position: relative;
    width: 676px;

    padding: 30px 50px 110px;
    gap: 30px;

    display: flex;
    flex-direction: column;

    img {
        position: absolute;
        bottom: -14px;
        left: 0;
    }

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 100%;
        padding: 30px 40px 80px;

        img {
            width: 100px;
            bottom: -52px;
        }
    }
`;

export const WaitingWrapperTitle = styled.div`
    text-align: center;
    font-size: 37px;

    small {
        color: ${({ theme }) => theme.accent};
    }

    @media screen and (max-width: ${Breakpoints.md}) {
        font-size: 24px;
    }
`;

export const TournamentWinnerWrapper = styled.div`
    position: relative;
    display: flex;
    height: 52px;

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
`;

export const TournamentWinnerHead = styled.div`
    position: absolute;
    height: 52px;
    width: calc(100% + 52px);
    left: -26px;
    background: ${({ theme }) => theme.accent};
    overflow: hidden;

    span {
        width: 52px;
        height: 52px;
        background: ${({ theme }) => theme.bg};
        position: absolute;
        rotate: 45deg;
    }

    span:first-child {
        left: -26px;
    }

    span:last-child {
        right: -26px;
    }
`;

export const TournamentWinnerContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 0 30px;
    width: 100%;

    @media screen and (max-width: ${Breakpoints.md}) {
        gap: 10px;
        padding: 0 18px;
    }
`;
