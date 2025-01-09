import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const DashboardWrapper = styled.div`
    height: calc(100svh - 200px - 24px - 24px - 100px);
    display: grid;
    grid-template-columns: 1fr 300px 1fr;
    gap: 24px;

    @media screen and (width < ${Breakpoints.md}) {
        height: 100%;
        grid-template-columns: 1fr;
    }

    section {
        display: grid;

        @media screen and (width < ${Breakpoints.md}) {
            &:nth-child(2) {
                order: 1;
            }
            &:nth-child(1) {
                order: 2;
            }
            &:nth-child(3) {
                order: 3;
            }
        }
    }
`;
