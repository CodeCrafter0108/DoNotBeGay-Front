import styled from 'styled-components';
import { ModalBaseWrapper } from '../styles';
import { Breakpoints } from '@/styles/breakpoints';

export const ModalMigrateWrapper = styled.div`
    width: 100%;
    max-width: 600px;
`;

export const ModalMigrateContent = styled(ModalBaseWrapper)`
    overflow: hidden;
`;

export const ModalMigrateInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: rgba(253, 194, 56, 0.04);
    border-radius: 4px;
    padding: 32px;

    @media screen and (width < ${Breakpoints.lg}) {
        flex-direction: column;
        gap: 5px;
        padding: 20px 32px;
    }
`;

export const ModalMigrateDefaultImages = styled.div`
    position: absolute;
    width: 100%;

    img {
        position: absolute;
        z-index: -1;
    }

    img:nth-child(1) {
        top: -232px;
        right: 15px;
    }

    img:nth-child(2) {
        top: -5px;
        right: -2px;
    }

    img:nth-child(3) {
        top: -5px;
        left: -2px;
    }

    @media screen and (width < ${Breakpoints.lg}) {
        img:nth-child(1) {
            top: -232px;
            right: -75px;
        }

        img:nth-child(2) {
            top: -5px;
            right: -20px;
        }

        img:nth-child(3) {
            top: -5px;
            left: -20px;
        }
    }
`;

export const ModalMigrateSuccessContent = styled.div`
    display: flex;
    gap: 30px;
    padding-left: 10px;
    padding-bottom: 20px;

    @media screen and (width < ${Breakpoints.lg}) {
        flex-direction: column;
        align-items: center;
        padding: 0;
    }
`;

export const ModalMigrateSuccessImages = styled.div`
    display: flex;
    position: relative;

    img:nth-child(1),
    img:nth-child(3) {
        position: absolute;
    }

    img:nth-child(1) {
        bottom: -20px;
        left: -20px;
    }

    img:nth-child(3) {
        top: -15px;
        right: 0;
    }

    @media screen and (width < ${Breakpoints.lg}) {
        padding: 20px 0;

        img:nth-child(1) {
            bottom: 0;
            left: -20px;
        }

        img:nth-child(3) {
            top: 0;
            right: 0;
        }
    }
`;
