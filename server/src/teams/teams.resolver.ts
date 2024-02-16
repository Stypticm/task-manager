import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Team } from './team.entity';
import { TeamsService } from './teams.service';
import { UpdateTeamInput } from './dto/create-team.inputs';

@Resolver(of => Team)
export class TeamsResolver {
    constructor(private readonly teamService: TeamsService) { }

    @Query(returns => [Team])
    async teams(): Promise<Team[]> {
        return this.teamService.getTeams();
    }

    @Query(returns => Team)
    async team(@Args('_id') id: string): Promise<Team> {
        return this.teamService.getTeamById(id);
    }

    @Mutation(returns => Team)
    async createTeam(
        @Args('name') name: string,
        @Args('description') description: string,
        @Args('admin') admin: string
    ): Promise<Team> {
        const createdTeam = { name, description, admin };
        return this.teamService.createTeam(createdTeam);
    }

    @Mutation(returns => Team)
    async deleteTeam(@Args('_id') id: string): Promise<Team> {
        return this.teamService.deleteTeam(id);
    }

    @Mutation(returns => Team)
    async updateTeam(
        @Args('_id') id: string,
        @Args('input') input: UpdateTeamInput
    ):Promise<Team> {
        const updatedTeam = { id, ...input };
        return this.teamService.updateTeam(updatedTeam);
    }
}
