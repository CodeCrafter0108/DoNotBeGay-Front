import styled from 'styled-components';

export const ImageWrapper = styled.div<{ size?: number; background?: string }>`
    width: ${({ size }) => size || 48}px;
    height: ${({ size }) => size || 48}px;
    overflow: hidden;
    position: relative;

    background: ${({ background }) => background || 'transparent'};

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: inherit;
        height: inherit;
        object-fit: cover;
    }
`;

export const CircledImageWrapper = styled(ImageWrapper)`
    border-radius: 50%;

    img {
        border-radius: 50%;
    }
`;
