import { IToken } from '@/types/tournament';

export interface TokenPricesProps {
    tokens?: IToken[];
    isLoading: boolean;
    onSelect: (token: IToken) => void;
}

export interface TokenPricesItemProps {
    token: IToken;
    index: number;
    onSelect: (token: IToken) => void;
}

export interface TokenPricesWrapperProps {
    isAvailable: boolean;
}
