import { ITournament } from '@/types/tournament';

export enum BoardType {
    Primary,
    Secondary,
    Waiting,
}

export interface BoardProps {
    started: boolean;
    tournament?: ITournament;
    isLoading: boolean;
}

export interface BoardPrimaryPairsProps {
    padding?: string;
    offset?: number;
}

export interface BoardWaitingProps {
    tournament?: ITournament;
}

export interface BoardPrimaryProps {
    tournament?: ITournament;
}

export interface BoardSecondaryProps {
    tournament?: ITournament;
}
