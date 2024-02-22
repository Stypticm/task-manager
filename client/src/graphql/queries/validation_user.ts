import { gql } from '@apollo/client';

export const QUERY_VALIDATE_USER = gql`
    query ValidateUser($field: String!, $password: String!) {
        validateUser(field: $field, password: $password) {
            username
            email
            _id
        }
    }
`