import { ApolloClient, useApolloClient } from '@apollo/client';
import { QUERY_GET_PROJECTS } from '../graphql/queries/query_getprojects';

export const filterProjects = async (apolloClient: ApolloClient<any>, status: string) => {
    try {
        const { data } = await apolloClient.query({
            query: QUERY_GET_PROJECTS
        });

        const filteredData = data.projects.filter((project: any) => project.status === status);

        return filteredData;
    } catch (error) {
        console.error('Error filtering projects:', error);
        return null;
    }
};