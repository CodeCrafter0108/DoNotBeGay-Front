import { gql } from '@apollo/client';

export const GetExplorerQuery = gql`
    query GetExplorer($id: String!) {
        tokens(where: { tournament: $id }) {
            id
            decimals
            imageUrl
            name
            position
            symbol
            totalLiquidityUSD
            totalSupply
            tradeVolume
            tradeVolumeUSD
            txCount
            priceETH
            priceUSD
            tokenDayData(first: 1, orderBy: "date", orderDirection: "desc") {
                date
                dailyVolumeUSD
            }
            tokenPriceDayData(first: 1, orderBy: "date", orderDirection: "desc") {
                date
                priceUSD
            }
            tokenPriceHourData(first: 1, orderBy: "date", orderDirection: "desc") {
                date
                priceUSD
            }
        }
    }
`;
