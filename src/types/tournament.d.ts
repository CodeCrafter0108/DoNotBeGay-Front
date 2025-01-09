import { SupportedChainId } from '@/config/contracts';
import { Pair, Token, Tournament, User } from '@/generated/types';
import { Abi, Address, Hash } from 'viem';

export interface ITournamentResponse {
    tournamentId: bigint;
    round: bigint;
    lastRound: bigint;
    startTime: bigint;
    isTournamentActive: boolean;
}

export interface ITournament {
    id: number;
    round: number;
    lastRound: number;
    date: string;
    isTournamentActive: boolean;
    nativeToken: IToken;
    users?: IUser[];
    tokens: IToken[];
    totalPrize: number;
    bracket: Bracket;
}

export interface IToken extends Token {
    address: Address;
    balance: string;
    balanceRaw: bigint;
    balanceUsd: number;
    isNative: boolean;
    allowance: bigint;
    isWin: boolean;
    isAvailable: boolean;
    isCanClaim?: boolean;
    isClaimed?: boolean;
    isIncoming?: boolean;
    migrationAddress?: Address;
    migrationBalance?: bigint;
    migrationAllowance?: bigint;
}

export interface ExplorerToken extends Token {
    volume24h: number;
    changePrice1h: number;
    changePrice24h: number;
    changePrice1hIncreased: boolean;
    changePrice1hDecreased: boolean;
    changePrice24hIncreased: boolean;
    changePrice24hDecreased: boolean;
}

export interface IListing {
    id: string;
    inTournament: string;
    tokenOwner: IUser;
    tokenPosition: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
    token: IToken;
}

export interface IDelisting {
    id: string;
    tokenOwner: IUser;
    inTournament: string;
    tokenPosition: string;
    token: IToken;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
}

export interface IUser extends Omit<User, 'listings' | 'delistings'> {
    listings?: IListing[];
    delistings?: IDelisting[];
}

export interface IProfile {
    user: IUser;
    points: IPoints;
    tokensOwned: IToken[];
    tokensDeployed: IToken[];
}

export type ILeaderboardProfile = Pick<IProfile, 'user' | 'points'>;

export interface IPoints {
    total: number;
    deployed: number;
    tradingVolume: number;
}

export interface IHistoryItem {
    tournament: Tournament;
    token: Token;
}

// useTournament.ts
export interface TournamentQueryProps {
    chainId: SupportedChainId;
    address?: Address;
}

export interface TournamentBracketProps {
    chainId: SupportedChainId;
    tournamentId: bigint;
    lastRound: number;
    tournamentTokens: IToken[];
}

export interface GetTournamentProps extends TournamentQueryProps {
    tournamentId: bigint;
    lastRound: number;
    round: number;
}

export interface GetPoolPrizeProps {
    pairs: Pair[];
    nativeToken: IToken;
    chainId: SupportedChainId;
}

export interface GetTournamentTokensProps {
    tokens: Token[];
    chainId: SupportedChainId;
    address?: Address;
}

export interface GetAvailableTokensProps {
    bracket: Bracket;
    round: number;
}

export interface GetTokensProps {
    tournamentTokens: IToken[];
    availableTokens: IToken[];
}

export type Bracket = IToken[][][];

export interface GetTournamentResponse extends Tournament {
    tokens: Token[];
    nativeToken: IToken;
    totalPrize: number;
    bracket: Bracket;
}

export type ContractCall<T extends (bigint | Address | Hash | number | string)[]> = {
    address: Address;
    abi: Abi;
    functionName: string;
    args: T;
};
