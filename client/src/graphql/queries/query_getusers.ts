import { gql } from '@apollo/client';

export const QUERY_GET_USERS = gql`
    query GetUsers {
        users {
            username
          }
    }
`;