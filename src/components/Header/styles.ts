import styled from 'styled-components';
import { BurgerWrapperProps, DesktopHeaderWrapperProps, SidebarWrapperProps } from '@/components/Header/types';

export const DesktopHeaderWrapper = styled.div<DesktopHeaderWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: ${({ isShowTabs }) => (isShowTabs ? 'space-between' : 'flex-end')};
    padding-left: 10px;

    position: absolute;
    overflow: hidden;

    top: 24px;
    right: 0;
    width: calc(100% - var(--sidebar-width) - 24px);

    z-index: 2;
`;

export const MobileHeaderWrapper = styled.div`
    background: ${({ theme }) => theme.bg};
    position: absolute;
    width: 100%;
    z-index: 100;
`;

export const MobileHeaderHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--mobile-header-height);
    padding: 0 20px;
`;

export const MobileHeaderContent = styled.div`
    position: static;
    width: 100%;
    height: calc(100svh - var(--mobile-header-height));
    padding: 30px 20px;

    top: 60px;
    z-index: 100;

    background: ${({ theme }) => theme.bg};
    color: #ffffff;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
`;

export const BurgerWrapper = styled.div<BurgerWrapperProps>`
    width: 22px;
    height: 22px;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;

    span {
        width: 22px;
        height: 2px;
        background: #fff;
        position: ${({ isOpened }) => (isOpened ? 'absolute' : 'static')};
        transition: all 0.3s ease;
    }

    span:nth-child(1) {
        transform: ${({ isOpened }) => (isOpened ? 'rotate(45deg)' : 'none')};
    }

    span:nth-child(2) {
        opacity: ${({ isOpened }) => (isOpened ? 0 : 1)};
    }

    span:nth-child(3) {
        transform: ${({ isOpened }) => (isOpened ? 'rotate(-45deg)' : 'none')};
    }
`;

export const SidebarWrapper = styled.div<SidebarWrapperProps>`
    position: fixed;
    width: ${({ isOpened }) => (isOpened ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width)')};
    height: 90%;
    top: 24px;

    transition: all 0.3s ease;
    z-index: 3;
`;
