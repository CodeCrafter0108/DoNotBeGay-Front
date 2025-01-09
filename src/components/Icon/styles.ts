import styled from 'styled-components';
import { IconSvgWrapperProps, IconTokenPrimaryWrapperProps, RemoteSvgWrapperProps } from '@/components/Icon/types';
import { getColorByState } from '@/styles/global';

export const IconSvgWrapper = styled.div<IconSvgWrapperProps>`
    opacity: ${({ opacity, disabled }) => (disabled ? 0.2 : opacity || 1)};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    cursor: ${({ cursor }) => cursor || 'unset'};
    user-select: none;
`;

export const IconTokenRemoteWrapper = styled.div<{ size?: number }>`
    border-radius: 50%;
    overflow: hidden;

    width: ${({ size }) => size || 35}px;
    height: ${({ size }) => size || 35}px;

    img {
        border-radius: inherit;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const IconTokenPrimaryWrapper = styled.div<IconTokenPrimaryWrapperProps>`
    display: flex;

    svg {
        path:nth-child(1) {
            fill: ${({ state, theme }) => getColorByState(theme, state)};
        }
        path:nth-child(2) {
            stroke: ${({ state, theme }) => getColorByState(theme, state)};
        }
    }
`;

export const RemoteSvgWrapper = styled.div<RemoteSvgWrapperProps>`
    svg {
        width: ${({ size }) => size || 'unset'};
        height: ${({ size }) => size || 'unset'};

        path {
            fill: ${({ color }) => color || 'unset'};
            stroke: ${({ strokeColor }) => strokeColor || 'unset'};
        }
    }
`;
