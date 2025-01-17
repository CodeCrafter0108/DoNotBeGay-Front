import Link from 'next/link';
import styled from 'styled-components';
import { LinkType } from '../../types';
import { Breakpoints } from '@/styles/breakpoints';

export const Wrapper = styled.div<{ bgImageDesk: string; bgImageMob: string }>`
    display: flex;
    justify-content: center;
    background-repeat: no-repeat;
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.73);
    height: 160px;
    width: 100%;
    max-width: 343px;
    background-image: ${({ bgImageMob }) => `url(${bgImageMob})`};

    transition: all 0.3s ease;

    :hover {
        transform: scale(1.02);
        box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.73);
    }

    @media screen and (min-width: ${Breakpoints.lg}) {
        height: 650px;
        width: 368px;
        background-image: ${({ bgImageDesk }) => `url(${bgImageDesk})`};
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 100%;
    max-width: 180px;

    @media screen and (min-width: ${Breakpoints.lg}) {
        justify-content: flex-end;
        gap: 16px;
        margin-top: 110px;
        height: 135px;
    }
`;

export const StyledLink = styled(Link)<{ linkType: LinkType }>`
    display: flex;
    justify-content: center;
    border-radius: 4px;
    padding: 12px 32px;
    font-size: 18px;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.55);
    color: ${({ linkType }) => (linkType === 'white' ? '#1E1E1E' : '#ffffff')};
    background-color: ${({ linkType }) => (linkType === 'white' ? '#ffffff' : '#1E1E1E')};

    transition: all 0.3s ease;

    :hover {
        transform: scale(1.01);
    }

    :active {
        transform: scale(1.02);
    }
`;

export const Title = styled.div`
    font-size: 28px;
    width: 100%;
    max-width: 180px;
    color: #ffffff;
    text-align: center;

    @media screen and (min-width: ${Breakpoints.lg}) {
        font-size: 40px;
    }
`;
