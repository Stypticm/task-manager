import { gql } from '@apollo/client';

export const QUERY_GET_PROJECTS = gql`
    query GetProjects {
        projects {
            _id
            title
            description
            status
            assignedTo
        }
    }
`

export const QUERY_GET_PROJECT = gql`
    query GetProject($_id: String!) {
        project(_id: $_id) {
            title
            description
            status
            assignedTo
        }
    }
`