import { ModalsType } from '@/contexts/ModalContext';
import { SidebarItem } from '@/components/Header/types';
import { AppRoutes } from '@/types';

export const menuItems = [
    {
        icon: 'dashboard',
        text: 'Dashboard',
        link: `${AppRoutes.DASHBOARD}/profile`,
    },
    {
        icon: 'web',
        text: 'Explorer',
        link: AppRoutes.TOKEN_EXPLORER,
    },
    {
        icon: 'money',
        text: 'Tournament',
        link: AppRoutes.TOURNAMENT,
    },
    {
        icon: 'prize',
        text: 'History',
        link: AppRoutes.BATTLE_HISTORY,
    },
    {
        icon: 'history',
        text: 'Launcher',
        link: AppRoutes.LAUNCHER,
    },
] as SidebarItem[];

export const socialItems = [
    {
        icon: 'image',
        text: 'Theme',
        modal: ModalsType.theme,
    },
    {
        icon: 'discord',
        text: 'Discord',
        link: AppRoutes.DISCORD,
    },
    {
        icon: 'x',
        text: 'Twitter',
        link: AppRoutes.DASHBOARD,
    },
    {
        icon: 'docs',
        text: 'Documentation',
        link: AppRoutes.DOCS,
    },
] as SidebarItem[];
