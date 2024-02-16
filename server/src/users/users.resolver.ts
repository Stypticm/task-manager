import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Query(returns => User)
    async user(@Args('_id') id: string): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Mutation(returns => User)
    async createUser(
        @Args('username') username: string,
        @Args('email') email: string,
        @Args('password') password: string
    ): Promise<User> {
        const createdUser = {username, email, password}

        return this.usersService.createUser(createdUser);
    }

    @Query(returns => User)
    async validateUser(
        @Args('field') field: string,
        @Args('password') password: string
    ): Promise<User> {
        return this.usersService.validateUser(field, password);
    }

    @Mutation(returns => User)
    async deleteUser(@Args('_id') id: string): Promise<User> {
        return this.usersService.deleteUser(id);
    }
}
