import React from 'react';
import { ModalsType } from '@/contexts/ModalContext';

export type HeaderType = {
    Desktop: React.FC;
    Mobile: React.FC;
    Sidebar: React.FC;
};

export interface BurgerProps {
    isOpened: boolean;
    onClick: () => void;
}

export interface SidebarWrapperProps {
    isOpened?: boolean;
}

export interface SidebarItem {
    icon: string;
    text: string;
    link?: string;
    modal?: ModalsType;
}

export type BurgerWrapperProps = Partial<BurgerProps>;

export interface DesktopHeaderWrapperProps {
    isShowTabs?: boolean;
}

export enum HeaderTabs {
    PROFILE,
    LEADERBOARD,
    WAYS_TO_EARN,
    STAKE,
    UNSTAKE,
}
