import { IToken } from '@/types/tournament';
import { Formatter } from './formatter';

export const getPairPercentByPrice = (token0?: IToken, token1?: IToken) => {
    if (!token0 || !token1) return 0;
    const total = Number(token0.priceUSD) + Number(token1.priceUSD);
    const percent0 = (Number(token0.priceUSD) / total) * 100;
    const percent1 = (Number(token1.priceUSD) / total) * 100;
    const percent = percent0 > percent1 ? percent0 : percent1;
    return 100 - percent;
};

export const getPercents = (token0?: IToken, token1?: IToken): [string, string] => {
    if (!token0 || !token1) return ['0', '0'];
    const total = Number(token0?.priceUSD) + Number(token1?.priceUSD);
    const percent0 = (Number(token0.priceUSD) / total) * 100;
    const percent1 = (Number(token1.priceUSD) / total) * 100;
    return [Formatter.formatNumber(percent0), Formatter.formatNumber(percent1)];
};
