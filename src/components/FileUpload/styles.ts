import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const FileUploadWrapper = styled.div`
    width: 100%;
    height: 80px;
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 0 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: ${Breakpoints.lg}) {
        flex-direction: column;
        height: 100%;
        padding: 16px;
        gap: 16px;

        * {
            text-align: center;
        }

        div:first-child {
            order: 1;
        }
    }
`;

export const FileUploadImage = styled.div`
    border-radius: 50%;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.accent};

    img {
        border-radius: inherit;
    }
`;
