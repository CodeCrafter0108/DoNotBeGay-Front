import { IToken } from '@/types/tournament';

export enum ShowType {
    CIRCLE,
    LIST,
}

export interface CircleWrapperProps {}

export interface TabsItemsProps {
    active?: boolean;
    type?: ShowType;
}

export interface TokenCircleProps {
    tokens?: IToken[];
    isLoading: boolean;
    onSelect: (token: IToken) => void;
}

export interface TokenCircleListProps {
    tokens?: IToken[];
    onSelect: (token: IToken) => void;
}

export interface ListItemProps {
    token: IToken;
    index: number;
    onSelect: (token: IToken) => void;
}

export interface ListItemWrapperProps {
    isAvailable: boolean;
}
