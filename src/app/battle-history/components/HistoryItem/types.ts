import { Token, Tournament } from '@/generated/types';

export interface HistoryItemProps {
    token: Partial<Token>;
    tournament: Partial<Tournament>;
}
