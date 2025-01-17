import { AppRoutes } from '@/types';
import { CardData } from './types';

export const socialHomePage: { icon: string; link: string }[] = [
    {
        icon: '/img/home/x.svg',
        link: '#',
    },
    {
        icon: '/img/home/docs.svg',
        link: '#',
    },
    {
        icon: '/img/home/discord.svg',
        link: '#',
    },
];

export const cardsData: CardData[] = [
    {
        title: 'Launch MEME token',
        link: AppRoutes.LAUNCHER,
        linkType: 'black',
        bgImageDesk: '/img/home/launcher-desk.svg',
        bgImageMob: '/img/home/launcher-mob.svg',
    },
    {
        title: 'Tourmanent',
        link: AppRoutes.TOURNAMENT,
        linkType: 'white',
        bgImageDesk: '/img/home/tournament-desk.svg',
        bgImageMob: '/img/home/tournament-mob.svg',
    },
    {
        title: 'Trade on MEME DEX',
        link: AppRoutes.MEMEDEX,
        linkType: 'black',
        bgImageDesk: '/img/home/meme-desk.svg',
        bgImageMob: '/img/home/meme-mob.svg',
    },
];
