import { SupportedChainId } from '@/config/contracts';
import { Address } from 'viem';
import { IToken, ITournament } from '@/types/tournament';
import { Tournament } from '@/generated/types';

interface ProfileQueryProps {
    chainId: SupportedChainId;
    address?: Address;
    tournament?: ITournament;
}

interface GetWinnersTokensProps {
    address?: Address;
    chainId: SupportedChainId;
    tournaments: Tournament[];
}

interface GetMigrationInfoProps {
    tokens: IToken[];
    chainId: SupportedChainId;
    address?: Address;
}

interface GetTokensOwnedProps {
    address?: Address;
    chainId: SupportedChainId;
    tournamentTokens: IToken[];
    tournaments: Tournament[];
}

interface GetTokensDeployedProps {
    listings: IToken[];
    delistings: IToken[];
    tournamentId: string;
}
