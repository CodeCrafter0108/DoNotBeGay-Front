import { ILeaderboardProfile } from '@/types/tournament';

export interface LeaderBoardTableProps {
    profiles: ILeaderboardProfile[];
    search: string;
}
