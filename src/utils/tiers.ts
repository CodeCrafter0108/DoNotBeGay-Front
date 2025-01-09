export enum Tiers {
    A = '#FDC238',
    B = '#808836',
    C = '#D10363',
    D = '#5A639C',
    E = '#E2BBE9',
    F = '#E76F51',
    G = '#00FFBF',
    H = '#8000FF',
    I = '#00FF00',
    J = '#00FF40',
    K = '#00FF80',
    L = '#00aFBF',
    M = '#00FFFF',
    N = '#00BFFF',
    O = '#0080FF',
    P = '#0040FF',
    Q = '#0000FF',
    R = '#4000FF',
    S = '#2000FF',
    T = '#BF00FF',
    U = '#FF00FF',
    V = '#FF00BF',
    W = '#FF0080',
    X = '#FF0040',
    Y = '#FFF000',
    Z = '#FF0F00',
}

const getTierName = (index: number) => {
    return Object.keys(Tiers)[index];
};

const getTierColor = (index: number) => {
    const tier = getTierName(index) as keyof typeof Tiers;
    return Tiers[tier];
};

export const getTierByIndex = (index: number): { name: string; color: string } => {
    return {
        name: getTierName(index),
        color: getTierColor(index),
    };
};
