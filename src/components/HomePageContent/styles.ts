import { Badge } from '@/app/token-profile/components/TournamentCard/styles';
import { Breakpoints } from '@/styles/breakpoints';
import Image from 'next/image';
import styled from 'styled-components';

export const MainBadge = styled(Badge)<{ isRotate?: boolean }>`
    width: 350px;
    height: 60px;
    clip-path: ${({ isRotate }) =>
        isRotate ? 'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 10% 50%, 0 0)' : 'polygon(90% 0%, 100% 0, 90% 50%, 100% 100%, 0 100%, 0 50%, 0 0)'};

    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.accent};
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 60px;

    gap: 12px;

    @media screen and (min-width: ${Breakpoints.md}) {
        width: 350px;
        height: 60px;
        font-size: 18px;
        justify-content: center;
        padding-left: 0px;
        padding-right: 0px;
    }
`;

export const Icon = styled(Image)``;

export const CardsWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    gap: 24px;
    padding: 0 16px;

    @media screen and (min-width: ${Breakpoints.lg}) {
        flex-direction: row;
        justify-content: space-between;
        margin-top: 70px;
        padding: 0 24px;
        gap: 0;
    }
`;
