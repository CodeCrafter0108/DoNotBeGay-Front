import { gql } from '@apollo/client';

export const GetTournamentQuery = gql`
    query GetTournament($id: String!) {
        tournament(id: $id) {
            date
            users {
                id
            }
            tokens {
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
            }
            pairs {
                id
                reserve0
                reserve1
                token0 {
                    id
                }
                token1 {
                    id
                }
            }
        }
    }
`;
