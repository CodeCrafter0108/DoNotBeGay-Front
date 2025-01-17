import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';
import Image from 'next/image';

export const SupplyBox = styled.div`
    height: 48px;
    border-radius: 12px;
    background: #fdc2381f;
    border: 1px solid #fdc23833;
    padding: 0 15px;
`;

export const BoxWrapper = styled.div`
    width: 676px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media screen and (max-width: ${Breakpoints.md}) {
        width: 100%;
    }
`;

export const BoxWrapperRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    padding: 30px 40px;
    overflow: hidden;

    @media screen and (max-width: ${Breakpoints.md}) {
        padding: 20px 15px;
        gap: 16px;
    }
`;