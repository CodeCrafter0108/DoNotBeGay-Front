import { gql } from '@apollo/client';

export const GetUsersQuery = gql`
    query GetUsers {
        users {
            id
            listings {
                id
                token {
                    id
                    decimals
                    imageUrl
                    name
                    symbol
                    tradeVolume
                    tradeVolumeUSD
                }
            }
            tradingVolume
        }
    }
`;
