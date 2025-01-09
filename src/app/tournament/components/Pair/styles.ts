import styled from 'styled-components';
import { getBgByState, getColorByState } from '@/styles/global';
import { PrimaryPairConnectLineItemProps, PrimaryPairItemProps, PrimaryPairWrapperProps } from './types';
import { PairState } from '@/types';
import { Breakpoints } from '@/styles/breakpoints';

const HEIGHT = 84;
const OFFSET = 26;

export const PrimaryPairWrapper = styled.div<PrimaryPairWrapperProps>`
    display: flex;
    flex-direction: column;
    gap: ${({ offset }) => (offset ? offset * OFFSET : 26)}px;
    position: relative;
`;

export const PrimaryPairItem = styled.div<PrimaryPairItemProps>`
    width: 100%;
    position: relative;
    height: ${HEIGHT}px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 15px;

    color: ${({ state, theme }) => getColorByState(theme, state)};
    background: ${({ state, theme }) => getBgByState(theme, state)};
    border: ${({ state, theme }) => `1px solid ${getColorByState(theme, state)}`};

    span {
        font-size: 28px;
    }

    &::before {
        content: '';
        position: absolute;
        top: calc(50% - 9px);
        right: -4px;
        width: 8px;
        height: 18px;
        background: ${({ state, theme }) => (state === PairState.ACTIVE ? theme.accent : getColorByState(theme, state))};
        z-index: 1;
    }

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 80px;
        padding: 0;
        justify-content: center;

        &::before {
            width: 4px;
        }
    }
`;

export const PrimaryPairConnectLine = styled.div`
    position: absolute;

    top: calc(${HEIGHT / 2}px - 1px);
    right: -30px;

    width: 30px;
    height: calc(100% - ${HEIGHT}px + 2px);

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 14px;
        right: 4px;
    }
`;

export const PrimaryPairConnectLineItem = styled.div<PrimaryPairConnectLineItemProps>`
    width: 100%;
    height: 50%;

    border: ${({ state, theme }) =>
        state === PairState.INACTIVE ? 'none' : state === PairState.WIN || state === PairState.ACTIVE ? `2px solid ${theme.accent}` : `2px solid ${theme.gray}`};

    border-left: 0;
    border-top: ${({ position }) => (position === 'bottom' ? '0' : '')};
    border-bottom: ${({ position }) => (position === 'top' ? '0' : '')};
    border-radius: ${({ position }) => (position === 'top' ? '0 4px 0 0' : '0 0 4px 0')};
`;

export const PrimaryPairConnectLineCircle = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bg};
    position: absolute;
    top: 50%;
    left: calc(50% + 13px);
    border: 2px solid ${({ theme }) => theme.accent};

    transform: translate(-50%, -50%);

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 20px;
        height: 20px;
        left: calc(50% + 6px);
    }
`;

export const SecondaryWrapperItem = styled.div<{ color: string; transparent?: boolean; compact?: boolean }>`
    border: 1px solid ${({ theme, color, transparent }) => (transparent ? 'unset' : color ? color : theme.accent)};
    padding: ${({ compact }) => (compact ? '0' : '12px 20px')};
    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background: ${({ color, transparent }) => (transparent ? 'unset' : `${color}12`)};
`;

export const SecondaryWrapperItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;

    @media screen and (max-width: ${Breakpoints.md}) {
        grid-template-columns: 1fr;
    }
`;

export const Range = styled.div<{ percent: number }>`
    height: 16px;
    border-radius: 4px;
    background: #d9d9d905;
    position: relative;

    display: flex;
    justify-content: space-between;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${({ percent }) => (percent ? percent : 0)}%;
        background: ${({ theme }) => theme.accent};
        border-radius: 4px;
    }

    span {
        position: absolute;
        color: #fff;
    }

    span:nth-child(1) {
        left: 15px;
    }

    span:nth-child(2) {
        right: 15px;
    }
`;
