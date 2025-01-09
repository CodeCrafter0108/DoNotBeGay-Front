import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';
import { TokenPricesWrapperProps } from './types';

export const TokenPricesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;

    @media screen and (max-width: ${Breakpoints.md}) {
        height: 460px;
    }
`;

export const TokenPricesItemWrapper = styled.div<TokenPricesWrapperProps>`
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
