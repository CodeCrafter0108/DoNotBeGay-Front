import styled, { css, keyframes } from 'styled-components';

const dotAnimation = keyframes`
    0%, 80%, 100% {
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
`;

const skeletonAnimation = keyframes`
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: -100% 50%;
    }
`;

const generateNthChildStyles = (count: number) => {
    let styles = '';
    for (let i = 1; i <= count; i++) {
        styles += `
        &:nth-child(${i}) {
          animation-delay: ${0.2 * (i - 1)}s;
        }
      `;
    }
    return css`
        ${styles}
    `;
};

export const DotsWrapper = styled.div<{ count: number; color?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${({ color }) => color || 'rgba(0, 0, 0, 0.25)'};

        animation: ${dotAnimation} 1.4s infinite;
        animation-fill-mode: both;

        ${({ count }) => generateNthChildStyles(count)}
    }
`;

export const SkeletonWrapper = styled.div`
    background: linear-gradient(90deg, #2b282a 29.64%, #434042 50.36%, #2b282a 73.64%);
    background-size: 200% 100%;
    animation: ${skeletonAnimation} 1s infinite ease-in-out;
    border-radius: 4px;
    width: 100%;
    height: 100%;

    display: flex;
    align-self: center;
`;

export const LoaderTextWrapper = styled.div<{ dotsCount?: number }>`
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        animation: fade 1s infinite;
        opacity: 0.2;
        ${({ dotsCount }) => generateNthChildStyles(dotsCount || 3)}
    }

    @keyframes fade {
        0%,
        100% {
            opacity: 0.2;
        }
        50% {
            opacity: 1;
        }
    }
`;
