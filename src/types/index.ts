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

export enum AppRoutes {
    LAUNCHER = '/launcher',
    TOURNAMENT = '/tournament',
    TOKEN_EXPLORER = '/token-explorer',
    BATTLE_HISTORY = '/battle-history',
    DASHBOARD = '/dashboard',
    MEMEDEX = '/memdex',
    TELEGRAM = '/telegram',
    DISCORD = '/discord',
    TWITTER = '/twitter',
    DOCS = '/docs',
}
