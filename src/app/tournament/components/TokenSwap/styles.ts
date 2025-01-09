import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const IconWrapper = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.accent};
    border: 1px solid ${({ theme }) => theme.accent};
    box-shadow: 2px -2px 0 0 #0000008c;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 50%;
    left: 50%;

    z-index: 1;
    transform: translate(-50%, -50%);
    cursor: pointer;
`;

export const SwapInputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 18px;
    padding: 0 40px;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 0 20px;
    }
`;

export const SlippageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 0 20px;
    }
`;

export const FeeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 0 20px;
    }
`;

export const ActionWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 24px;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 24px;
    }
`;
