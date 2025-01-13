export interface User {
    name: string;
    avatar: string;
}

export interface ProjectConfig {
    theme: Theme;
}

export type Theme = {
    bg: string;
    gray: string;
    gray600: string;
    accent: string;
    white: string;
    disabled: string;
    hover: string;
    red: string;
    redLight: string;
    green: string;
    greenLight: string;
    yellow: string;
    black: string;
};

export enum AmountType {
    IN,
    OUT,
    NONE,
}

export enum PairState {
    ACTIVE,
    INACTIVE,
    WIN,
    LOSE,
}
