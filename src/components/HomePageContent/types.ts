import { AppRoutes } from "@/types";

export type LinkType = 'black' | 'white';

export interface CardData {
    title: string;
    link: AppRoutes;
    linkType: LinkType;
    bgImageDesk: string;
    bgImageMob: string;
}