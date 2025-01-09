import { gql } from '@apollo/client';

export const GetTokenQuery = gql`
    query GetToken($id: String!) {
        tokens(where: { id: $id }) {
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
            tournamentId
        }
    }
`;
