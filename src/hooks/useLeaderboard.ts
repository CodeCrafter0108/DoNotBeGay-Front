import { GetUsersQuery } from '@/graphql/queries/GetUsersQuery';
import { SupportedChainId } from '@/config/contracts';
import { getGraphClient } from '@/config/graph';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RefetchInterval } from '@/config/constants';
import { ILeaderboardProfile, IUser } from '@/types/tournament';
import { getPointsByUser } from '@/utils/user';

interface LeaderBoardQueryProps {
    chainId: SupportedChainId;
}

const queryFn = async ({ chainId }: LeaderBoardQueryProps): Promise<ILeaderboardProfile[]> => {
    const client = getGraphClient(chainId);

    try {
        const { data } = await client.query<{ users: IUser[] }>({ query: GetUsersQuery });

        if (!data?.users) return [];

        return data.users.map((user) => ({
            user,
            points: getPointsByUser(user),
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useLeaderboard = (props: LeaderBoardQueryProps) => {
    return useQuery({
        queryKey: ['use-leaderboard', props],
        queryFn: () => queryFn(props),
        placeholderData: keepPreviousData,
        refetchInterval: RefetchInterval.FAST,
    });
};
