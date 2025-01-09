import { gql } from '@apollo/client';

export const GetTournamentsQuery = gql`
    query GetTournaments {
        tournaments {
            id
            date
            tokens {
                id
                name
                imageUrl
            }
        }
    }
`;
