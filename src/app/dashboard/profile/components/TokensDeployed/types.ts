import { IToken } from '@/types/tournament';

export interface TokensDeployedProps {
    tokens?: IToken[];
    isLoading: boolean;
    onClaimed: () => void;
}
