import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.entity';
import { Model, isValidObjectId } from 'mongoose';
import { CreateTaskInput, UpdateTaskInput } from './dto/create-task.input';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) { }

    async getTasks(): Promise<Task[]> {
        if (!this.taskModel) {
            return [];
        }
        return await this.taskModel.find().exec()
    }

    async getTaskById(id: string): Promise<Task> {
        try {
            if (!id || !isValidObjectId(id)) {
                throw new NotFoundException('Task id is required');
            }

            const task = await this.taskModel.findById(id).exec();

            if (!task._id) {
                throw new NotFoundException('Task with given id not found')
            }

            return task.toObject()
        } catch (error) {
            throw new NotFoundException('Task with given id not found')
        }
    }

    async createTask(taskCreateInput: CreateTaskInput): Promise<Task> {
        const createdTask = new this.taskModel(taskCreateInput);
        const savedTask = await createdTask.save();
        return savedTask.toObject();
    }
   
    async deleteTask(id: string): Promise<Task> {
        try {
            if (!id) {
                throw new NotFoundException('Task id is required');
            }
            const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();

            if (!deletedTask._id) {
                throw new NotFoundException('Task with given id not found')
            }
            return deletedTask.toObject();
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('User with given id not found')
        }
    }

    async updateTask(
        taskUpdateInput: UpdateTaskInput
    ): Promise<Task> {
        const { _id, ...updatedFields } = taskUpdateInput;
        return this.taskModel.findByIdAndUpdate(_id, updatedFields, { new: true }).exec();
    }

}
