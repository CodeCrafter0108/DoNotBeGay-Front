import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';
import { ModalBaseWrapper } from '../styles';

export const ModalThemeWrapper = styled(ModalBaseWrapper)`
    gap: 24px;
    width: 100%;
`;

export const ModalThemeItem = styled.div<{ selected?: boolean }>`
    padding: 10px;
    border-radius: 16px;
    position: relative;
    display: flex;
    border: 1px solid ${({ theme, selected }) => (selected ? theme.accent : theme.gray)};
    cursor: pointer;
    overflow: hidden;

    transition: all 0.1s ease;

    width: 218px;
    height: 132px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        border-radius: 12px;
        border: 1px solid ${({ theme }) => theme.gray};
    }

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 100%;
    }
`;

export const ModalThemeContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media screen and (max-width: ${Breakpoints.md}) {
        grid-template-columns: 1fr;
        max-height: 300px;
        overflow-y: auto;
    }
`;
