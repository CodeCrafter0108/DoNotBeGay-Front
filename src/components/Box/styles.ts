import styled from 'styled-components';
import { BoxWrapperProps } from '@/components/Box/types';

const PIXEL_SIZE = 3;

const generateClipPath = (pixelatedCorners?: BoxWrapperProps['pixelatedCorners']) => {
    const hasTopLeft = pixelatedCorners?.includes('topLeft');
    const hasTopRight = pixelatedCorners?.includes('topRight');
    const hasBottomRight = pixelatedCorners?.includes('bottomRight');
    const hasBottomLeft = pixelatedCorners?.includes('bottomLeft');

    return `
        // bottom left
        0px calc(100% - ${hasBottomLeft ? PIXEL_SIZE * 4 : 0}px),
        ${hasBottomLeft ? PIXEL_SIZE : 0}px calc(100% - ${hasBottomLeft ? PIXEL_SIZE * 4 : 0}px),
        ${hasBottomLeft ? PIXEL_SIZE : 0}px calc(100% - ${hasBottomLeft ? PIXEL_SIZE * 2 : 0}px),
        ${hasBottomLeft ? PIXEL_SIZE * 2 : 0}px calc(100% - ${hasBottomLeft ? PIXEL_SIZE * 2 : 0}px),
        ${hasBottomLeft ? PIXEL_SIZE * 2 : 0}px calc(100% - ${hasBottomLeft ? PIXEL_SIZE : 0}px),
        ${hasBottomLeft ? PIXEL_SIZE * 4 : 0}px calc(100% - ${hasBottomLeft ? PIXEL_SIZE : 0}px),
        ${hasBottomLeft ? PIXEL_SIZE * 4 : 0}px 100%,
        // bottom right
        calc(100% - ${hasBottomRight ? PIXEL_SIZE * 4 : 0}px) 100%,
        calc(100% - ${hasBottomRight ? PIXEL_SIZE * 4 : 0}px) calc(100% - ${hasBottomRight ? PIXEL_SIZE : 0}px),
        calc(100% - ${hasBottomRight ? PIXEL_SIZE * 2 : 0}px) calc(100% - ${hasBottomRight ? PIXEL_SIZE : 0}px),
        calc(100% - ${hasBottomRight ? PIXEL_SIZE * 2 : 0}px) calc(100% - ${hasBottomRight ? PIXEL_SIZE * 2 : 0}px),
        calc(100% - ${hasBottomRight ? PIXEL_SIZE : 0}px) calc(100% - ${hasBottomRight ? PIXEL_SIZE * 2 : 0}px),
        calc(100% - ${hasBottomRight ? PIXEL_SIZE : 0}px) calc(100% - ${hasBottomRight ? PIXEL_SIZE * 4 : 0}px),
        100% calc(100% - ${hasBottomRight ? PIXEL_SIZE * 4 : 0}px),
        // top right
        100% ${hasTopRight ? PIXEL_SIZE * 4 : 0}px,
        calc(100% - ${hasTopRight ? PIXEL_SIZE : 0}px) ${hasTopRight ? PIXEL_SIZE * 4 : 0}px,
        calc(100% - ${hasTopRight ? PIXEL_SIZE : 0}px) ${hasTopRight ? PIXEL_SIZE * 2 : 0}px,
        calc(100% - ${hasTopRight ? PIXEL_SIZE * 2 : 0}px) ${hasTopRight ? PIXEL_SIZE * 2 : 0}px,
        calc(100% - ${hasTopRight ? PIXEL_SIZE * 2 : 0}px) ${hasTopRight ? PIXEL_SIZE : 0}px,
        calc(100% - ${hasTopRight ? PIXEL_SIZE * 4 : 0}px) ${hasTopRight ? PIXEL_SIZE : 0}px,
        calc(100% - ${hasTopRight ? PIXEL_SIZE * 4 : 0}px) 0px,
        // top left
        ${hasTopLeft ? PIXEL_SIZE * 4 : 0}px 0px,
        ${hasTopLeft ? PIXEL_SIZE * 4 : 0}px ${hasTopLeft ? PIXEL_SIZE : 0}px,
        ${hasTopLeft ? PIXEL_SIZE * 2 : 0}px ${hasTopLeft ? PIXEL_SIZE : 0}px,
        ${hasTopLeft ? PIXEL_SIZE * 2 : 0}px ${hasTopLeft ? PIXEL_SIZE * 2 : 0}px,
        ${hasTopLeft ? PIXEL_SIZE : 0}px ${hasTopLeft ? PIXEL_SIZE * 2 : 0}px,
        ${hasTopLeft ? PIXEL_SIZE : 0}px ${hasTopLeft ? PIXEL_SIZE * 4 : 0}px,
        0px ${hasTopLeft ? PIXEL_SIZE * 4 : 0}px
    `;
};

export const BoxWrapper = styled.div<BoxWrapperProps>`
    background: ${({ backgroundColor, theme }) => (backgroundColor ? backgroundColor : theme.bg)};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};

    padding: ${({ padding }) => padding || '10px 20px'};
    border-radius: ${({ radius }) => radius || '12px'};
    clip-path: ${({ pixelatedCorners }) => (pixelatedCorners ? `polygon(${generateClipPath(pixelatedCorners)})` : 'none')};
    overflow: ${({ overflow }) => overflow || 'unset'};
    position: relative;
`;
