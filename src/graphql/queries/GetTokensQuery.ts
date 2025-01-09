import { gql } from '@apollo/client';

export const GetTokensQuery = gql`
    query GetTokens($ids: [String!]!) {
        tokens(where: { id_in: $ids }) {
            id
            imageUrl
            name
            position
            priceETH
            priceUSD
            tournamentId
        }
    }
`;
