export type ILaunchpadResponse = {
    poolingToken: bigint;
    poolingTournament: bigint;
    INITIAL_LIQ: bigint;
};

export interface ILaunchpad {
    poolingToken: number;
    poolingTournament: number;
    INITIAL_LIQ: bigint;
    currentThreshold: number;
    nextThreshold: number;
    tokensSubmitted: number;
    tokensConfirmed: number;
    tokensPending: number;
    tokensRequired: number;
}
