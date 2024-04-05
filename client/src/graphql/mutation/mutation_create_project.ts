import {gql} from '@apollo/client';

export const MUTATION_CREATE_PROJECT = gql`
    mutation CreateProject($title: String!, $description: String!, $assignedTo: String!, $status: String!) {
        createProject(title: $title, description: $description, assignedTo: $assignedTo, status: $status) {
            _id
            title
            description
            status
            assignedTo
        }
    }
`