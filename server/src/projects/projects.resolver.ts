import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { UpdateProjectInput } from './dto/create-project.input';

@Resolver(of => Project)
export class ProjectsResolver {
    constructor (private readonly projectsService: ProjectsService) { }

    @Query(returns => [Project])
    async projects(): Promise<Project[]> {
        return this.projectsService.getProjects();
    }

    @Query(returns => Project)
    async project(@Args('_id') id: string): Promise<Project> {
        return this.projectsService.getProjectById(id);
    }

    @Mutation(returns => Project)
    async createProject(
        @Args('title') title: string,
        @Args('description') description: string,
        @Args('assignedTo') assignedTo: string,
        @Args('status') status: string
    ): Promise<Project> {
        const createdProject = { title, description, assignedTo, status };
        return this.projectsService.createProject(createdProject);
    }

    @Mutation(returns => Project)
    async deleteProject(@Args('_id') id: string): Promise<Project> {
        return this.projectsService.deleteProject(id);
    }

    @Mutation(returns => Project)
    async updateProject(
        @Args('_id') id: string,
        @Args('input') input: UpdateProjectInput
    ): Promise<Project> {
        const updatedProject = { id, ...input };
        return this.projectsService.updateProject(updatedProject);
    }
}
