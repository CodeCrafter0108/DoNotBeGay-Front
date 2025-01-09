import { POINTS_FOR_DEPLOY, POINTS_FOR_TRADE } from '@/config/constants';
import { User } from '@/generated/types';
import { IPoints, IUser } from '@/types/tournament';

export const getPointsByUser = (user: User | IUser): IPoints => {
    const userTokenDeployed = user.listings?.length || 0;
    const userTradingVolume = Number(user.tradingVolume) || 0;

    const total = userTokenDeployed * POINTS_FOR_DEPLOY + userTradingVolume * POINTS_FOR_TRADE;
    const deployed = userTokenDeployed * POINTS_FOR_DEPLOY;
    const tradingVolume = userTradingVolume * POINTS_FOR_TRADE;

    return { total, deployed, tradingVolume };
};
