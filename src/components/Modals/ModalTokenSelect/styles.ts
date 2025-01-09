import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';
import { ModalTokenSelectItemProps } from './types';

export const ModalTokenSelectWrapper = styled.div`
    display: grid;
    gap: 20px;

    width: 500px;
    max-height: 545px;
    padding: 30px;

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 100%;
        max-height: 400px;
    }
`;

export const ModalTokenSelectItem = styled.div<ModalTokenSelectItemProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease;

    padding: 0 5px;
    border-radius: 4px 4px 0 0;

    opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.5)};
    pointer-events: ${({ isAvailable }) => (isAvailable ? 'auto' : 'none')};

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid ${({ theme }) => theme.hover};
    }
`;

export const ModalTokenSelectList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    height: 300px;
    overflow-y: auto;
    overscroll-behavior: contain;

    @media screen and (max-width: ${Breakpoints.md}) {
        height: 240px;
    }
`;
