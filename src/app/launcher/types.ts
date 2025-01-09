import { Address } from 'viem';

export interface LaunchForm {
    name: string;
    symbol: string;
    websiteUrl: string;
    imageUrl: string;
    description: string;
    chatUrl: string;
    socialUrl: string;
    donation: string;
}

export type LaunchFormArgs = [string, string, string, string, string, string, string, bigint];

export type LaunchSimulationResult = [Address, bigint, bigint, Address]; // [user address, tournament id, token index, token address]
