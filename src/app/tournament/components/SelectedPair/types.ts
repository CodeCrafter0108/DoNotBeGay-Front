import { IToken, ITournament } from '@/types/tournament';

export interface SelectedPairProps {
    tournament?: ITournament;
    pair?: IToken[];
    onClose: () => void;
}
