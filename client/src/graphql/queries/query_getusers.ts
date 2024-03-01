import { gql } from '@apollo/client';

export const QUERY_GET_USERS = gql`
    query GetUsers {
        users {
            username
          }
    }
`;

export const QUERY_GET_USER = gql`
    query GetUser($_id: String!) {
        user(_id: $_id) {
            username
            email
            createdAt
        }
    }
`