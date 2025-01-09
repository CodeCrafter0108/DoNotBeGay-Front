import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;

    width: 343px;

    @media screen and (max-width: ${Breakpoints.md}) {
        width: calc(100% - 30px);
        right: 15px;
    }
`;

export const DialogContent = styled.div`
    display: flex;
    border-radius: 20px;

    width: 100%;
    max-height: 112px;
    backdrop-filter: blur(40px);
    white-space: pre-wrap;
    overflow: hidden;
`;

export const DialogBody = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 98px;
`;
