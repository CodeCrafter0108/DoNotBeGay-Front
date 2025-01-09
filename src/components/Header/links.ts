import { ModalsType } from '@/contexts/ModalContext';
import { SidebarItem } from '@/components/Header/types';

export const menuItems = [
    {
        icon: 'dashboard',
        text: 'Dashboard',
        link: '/dashboard/profile',
    },
    {
        icon: 'web',
        text: 'Explorer',
        link: '/token-explorer',
    },
    {
        icon: 'money',
        text: 'Tournament',
        link: '/tournament',
    },
    {
        icon: 'prize',
        text: 'History',
        link: '/battle-history',
    },
    {
        icon: 'history',
        text: 'Launcher',
        link: '/launcher',
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
    },
    {
        icon: 'x',
        text: 'Twitter',
    },
    {
        icon: 'docs',
        text: 'Documentation',
    },
] as SidebarItem[];
