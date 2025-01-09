import { PairState } from '@/types';
import { IToken } from '@/types/tournament';

export interface PrimaryPairProps {
    token0?: IToken;
    token1?: IToken;
    active: boolean;
}

export interface PrimaryPairItemProps {
    state?: PairState;
}

export interface PrimaryPairWrapperProps {
    offset?: number;
}

export interface PrimaryPairConnectLineItemProps {
    state?: PairState;
    position: 'top' | 'bottom';
}

export interface SecondaryPairProps {
    token0?: IToken;
    token1?: IToken;
    percent: number;
    percent0: string;
    percent1: string;
    transparent?: boolean;
    compact?: boolean;
}
