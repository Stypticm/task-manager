import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Task } from './task.entity';
import { UpdateTaskInput } from './dto/create-task.input';
import { TasksService } from './tasks.service';

@Resolver(of => Task)
export class TasksResolver {
    constructor(private readonly tasksService: TasksService) { }

    @Query(returns => [Task])
    async tasks(): Promise<Task[]> {
        return this.tasksService.getTasks();
    }

    @Query(returns => Task)
    async task(@Args('_id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Mutation(returns => Task)
    async createTask(
        @Args('title') title: string,
        @Args('description') description: string,
        @Args('assignedTo') assignedTo: string,
        @Args('status') status: string
    ): Promise<Task> {
        const createdTask = { title, description, assignedTo, status };
        return this.tasksService.createTask(createdTask);
    }

    @Mutation(returns => Task)
    async deleteTask(@Args('_id') id: string): Promise<Task> {
        return this.tasksService.deleteTask(id);
    }

    @Mutation(returns => Task)
    async updateTask(
        @Args('_id') id: string,
        @Args('input') input: UpdateTaskInput
    ): Promise<Task> {
        const updatedTask = {id, ...input};
        return this.tasksService.updateTask(updatedTask);
    }
    
}
