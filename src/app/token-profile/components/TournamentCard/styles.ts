import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Planet from './icons/planetIcon.svg';

export const Wrapper = styled.div`
    @media screen and (min-width: 1200px) {
        width: 100%;
        max-width: 753px;
        height: 100%;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 6px;
    position: relative;
    padding-bottom: 40px;

    @media screen and (min-width: 1200px) {
        padding-top: 40px;
        padding-bottom: 0;
    }
`;

export const TitleContent = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    `;

export const Badge = styled.div<{ isRotate?: boolean }>`
    width: 133px;
    height: 28px;
    font-size: 14px;
    clip-path: ${({ isRotate }) =>
        isRotate ? 'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 10% 50%, 0 0)' : 'polygon(90% 0%, 100% 0, 90% 50%, 100% 100%, 0 100%, 0 50%, 0 0)'};

    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.bg};

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 1200px) {
        height: 34px;
        width: 200px;
        font-size: 18px;
    }
`;

export const MouseImage = styled(Image)`
    @media screen and (min-width: 1200px) {
        position: absolute;
        top: 25px;
        right: 50px;
        z-index: 2;
        transform: translateX(-50%);
    }
`;

export const FrogImage = styled(Image)`
    position: absolute;
    bottom: 10px;
    left: 10px;

    @media screen and (min-width: 1200px) {
        width: 95px;
        height: 87px;
    }
`;

export const DonationImage = styled(Image)`
    position: absolute;
    bottom: 0;
    left: 100%;
    transform: translateX(-100%);

    @media screen and (min-width: 1200px) {
        width: 90px;
        height: 88px;
    }
`;

export const LinkWrapper = styled.div`
    display: flex;
    gap: 12px;
    flex-direction: column;
    padding-bottom: 12px;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
        padding-bottom: 24px;
    }
`;

export const StyledLink = styled(Link)`
    display: flex;
    gap: 8px;

    span {
        font-size: 14xpx;
    }

    @media screen and (min-width: 1200px) {
        span {
            font-size: 18px;
        }
    }
`;

export const PlanetIcon = styled(Planet)`
    width: 16px;
    height: 16px;

    @media screen and (min-width: 1200px) {
        width: 24px;
        height: 24px;
    }
`;

export const Description = styled.p`
    color: ${({ theme }) => theme.gray};
    max-width: 400px;
    text-align: center;
    padding: 0 12px;
    font-size: 14px;

    @media screen and (min-width: 1200px) {
        font-size: 16px;
    }
`;
