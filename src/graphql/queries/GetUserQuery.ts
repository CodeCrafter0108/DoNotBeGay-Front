import { gql } from '@apollo/client';

export const GetUserQuery = gql`
    query GetUser($id: String!) {
        user(id: $id) {
            id
            listings {
                id
                token {
                    id
                    imageUrl
                    name
                    position
                    priceETH
                    tournamentId
                    tournament {
                        id
                    }
                }
            }
            delistings {
                id
                token {
                    id
                    name
                    position
                    tournamentId
                }
            }
            tradingVolume
        }
        tournaments {
            id
        }
    }
`;
