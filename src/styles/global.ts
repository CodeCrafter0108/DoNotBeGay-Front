import styled from 'styled-components';
import { background, color, flexbox, grid, layout, position, space } from 'styled-system';
import { AbsoluteProps, BoxProps, ContainerProps, FadeInProps, FlexProps, GridProps, PageContainerProps, TextProps } from './types';
import { Breakpoints } from '@/styles/breakpoints';
import { PairState } from '@/types';

const Box = styled.div<BoxProps>`
    ${background}
    ${layout}
    ${position}
    ${space}
    ${color}
`;

export const getBgByState = (theme: any, state?: PairState) => {
    switch (state) {
        case PairState.ACTIVE:
            return theme.accent;
        case PairState.INACTIVE:
            return 'transparent';
        case PairState.WIN:
            return 'transparent';
        case PairState.LOSE:
            return 'transparent';
        default:
            return theme.accent;
    }
};

export const getColorByState = (theme: any, state?: PairState) => {
    switch (state) {
        case PairState.ACTIVE:
            return theme.bg;
        case PairState.INACTIVE:
            return theme.white;
        case PairState.WIN:
            return theme.accent;
        case PairState.LOSE:
            return theme.gray;
        default:
            return theme.bg;
    }
};

export const Flex = styled(Box)<FlexProps & { cursor?: string }>`
    display: flex;
    cursor: ${({ cursor }) => cursor || 'unset'};
    gap: ${({ gap }) => (typeof gap !== 'undefined' ? gap : 10)}px;
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    position: ${({ position }) => position || 'relative'};
    border: ${({ border }) => (border ? '1px solid' : 'none')};
    border-radius: ${({ borderRadius }) => borderRadius || '0'};
    ${flexbox}
`;

export const Grid = styled(Box)<GridProps>`
    display: grid;
    position: relative;
    gap: ${({ gap }) => (typeof gap !== 'undefined' ? gap : 10)}px;
    border: ${({ border }) => (border ? '1px solid' : 'none')};
    ${flexbox}
    ${grid}
`;

export const Text = styled.span<TextProps>`
    font-size: ${({ fontSize }) => fontSize || '14px'};
    font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
    line-height: ${({ lineHeight }) => lineHeight || '1.45'};
    letter-spacing: ${({ letterSpacing }) => letterSpacing || '0.5px'};
    text-align: ${({ textAlign }) => textAlign || 'left'};
    color: ${({ color }) => color || '#fff'};
    white-space: ${({ wrap }) => wrap || 'unset'};
    height: ${({ height }) => height || 'auto'};
    text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};

    user-select: ${({ selectable }) => (selectable || typeof selectable === 'undefined' ? 'unset' : 'none')};

    text-overflow: ${({ width }) => (width ? 'ellipsis' : 'unset')};
    overflow: ${({ width }) => (width ? 'hidden' : 'unset')};
    width: ${({ width }) => width || 'auto'};

    font-variant-numeric: ${({ tabular }) => (tabular ? 'tabular-nums' : 'unset')};

    &:hover {
        text-overflow: ${({ width }) => (width ? 'unset' : 'ellipsis')};
        width: ${({ width }) => (width ? 'unset' : 'auto')};
        background: ${({ width }) => (width ? 'rgba(0,0,0,1)' : 'none')};
        border-radius: ${({ width }) => (width ? '4px' : 'none')};
    }
`;

export const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100%;
    min-height: 100svh;

    max-width: 1440px;
    margin: 0 auto;

    @media screen and (max-width: ${Breakpoints.lg}) {
        padding: ${({ paddingMobile: paddingMobile }) => paddingMobile || 'calc(var(--mobile-header-height) + 10px) 10px 0'};
    }
`;

export const PageContainer = styled.div<PageContainerProps>`
    position: relative;
    display: grid;
    gap: 24px;

    padding: 100px 32px 30px calc(var(--sidebar-width) + 32px);
    height: ${({ height }) => height || 'unset'};

    @media screen and (max-width: ${Breakpoints.lg}) {
        padding: 0;
        padding-bottom: 30px;
    }
`;

export const PageSearchWrapper = styled.div`
    display: flex;
    width: 286px;

    @media screen and (max-width: ${Breakpoints.lg}) {
        width: 100%;
    }
`;

export const Absolute = styled.div<AbsoluteProps>`
    position: absolute;
    top: ${({ top }) => top || 'unset'};
    left: ${({ left }) => left || 'unset'};
    bottom: ${({ bottom }) => bottom || 'unset'};
    right: ${({ right }) => right || 'unset'};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    z-index: ${({ zIndex }) => zIndex || 0};
`;

export const BackgroundWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100svh;
    z-index: -2;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const FadeIn = styled.div<FadeInProps>`
    height: ${({ height }) => height || '100%'};
    animation: fadeIn ${({ duration = 0.3 }) => `${duration}s`} ease forwards;
    animation-delay: ${({ delay }) => delay || '0s'};
    opacity: 0;

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

export const Line = styled.div<{ invert?: boolean }>`
    width: 95%;
    height: 16px;
    background: ${({ theme }) => theme.accent};
    border-radius: ${({ invert }) => (invert ? '0 8px 8px 0' : '8px 0 0 8px')};
`;

export const BoxRow = styled.div`
    padding: 30px 40px;
    position: relative;
    overflow: hidden;
    border-radius: 12px;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 20px 15px;
    }
`;

export const Scrollable = styled.div<{ height?: string }>`
    overflow-y: auto;
    height: ${({ height }) => height || 'inherit'};
    max-height: calc(100svh - 200px - 24px - 24px - 100px - 120px);

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: #3a3a3a;
        border-radius: 2px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

export const tooltipStyles = {
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '12px',
    padding: '8px 12px',
    backdropFilter: 'blur(12px)',
    width: 'max-content',
    maxWidth: '300px',
    zIndex: 9999,
};
