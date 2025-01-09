import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: 200;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const WrapperOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100svh;
    background: rgba(0, 0, 0, 0.7);

    z-index: 201;
`;

export const WrapperContent = styled.div`
    position: absolute;

    width: max-content;
    height: max-content;
    z-index: 202;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 100%;
    }
`;

export const ModalWrapper = styled.div`
    background: #121212;
    color: #fff;
    border-radius: 12px;

    animation: showModal 0.3s ease forwards;

    @media screen and (max-width: ${Breakpoints.md}) {
        width: calc(100% - 40px);
    }

    @keyframes showModal {
        from {
            opacity: 0;
            transform: translateY(-60px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const ModalBaseWrapper = styled.div`
    display: grid;
    gap: 20px;
    padding: 30px 40px;
    position: relative;

    @media screen and (width < ${Breakpoints.lg}) {
        padding: 20px;
    }
`;
