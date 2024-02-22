import { gql } from '@apollo/client';

export const MUTATION_CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email,password: $password) {
            _id 
            username
            password
            email
            createdAt
        }
    }
`