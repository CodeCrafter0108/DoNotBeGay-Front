import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';
import { ListItemWrapperProps } from './types';

// Circle
export const CircleWrapper = styled.div`
    height: 100%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CircleWrapperLines = styled.div`
    position: relative;
    width: 280px;
    height: 280px;

    display: flex;
    align-items: center;
    justify-content: center;

    span {
        position: absolute;
        border-radius: 50%;
    }

    span:nth-child(1) {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    span:nth-child(2) {
        width: 70%;
        height: 70%;
        border: 1px dashed rgba(255, 255, 255, 0.2);
    }

    span:nth-child(3) {
        width: 45%;
        height: 45%;
        border: 1px solid rgba(255, 255, 255, 0.4);
    }

    span:nth-child(4) {
        width: 64px;
        height: 64px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        &::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            width: calc(100% + 8px);
            height: calc(100% + 8px);
            border: 1px dashed rgba(255, 255, 255, 0.2);
            border-radius: 50%;
        }
    }
`;

export const BalanceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;

    @media screen and (max-width: ${Breakpoints.md}) {
        max-height: 304px;
    }
`;

export const ListItemWrapper = styled.div<ListItemWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.5)};
    pointer-events: ${({ isAvailable }) => (isAvailable ? 'auto' : 'none')};

    transition:
        transform 0.3s ease,
        opacity 0.3s ease;

    position: relative;
    overflow: hidden;

    &:hover {
        cursor: pointer;
        transform: scale(1.02);
    }

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, #fdc23820, transparent);
        transition: opacity 0.3s ease;
        opacity: 0;
    }

    &:hover::before {
        opacity: 1;
    }
`;
