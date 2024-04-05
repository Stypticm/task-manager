import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './project.entity';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProjectInput, UpdateProjectInput } from './dto/create-project.input';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private readonly projectModel: Model<Project>) { }

    async getProjects(): Promise<Project[]> {
        if (!this.projectModel) {
            return [];
        }
        return await this.projectModel.find().exec();
    }

    async getProjectById(id: string): Promise<Project> {
        try {
            if (!id || !isValidObjectId(id)) {
                throw new NotFoundException('Project id is required');
            }
            
            const project = await this.projectModel.findById(id).exec();

            if (!project._id) {
                throw new NotFoundException('Project with given id not found')
            }

            return project.toObject();
        } catch (error) {
            throw new NotFoundException('Project with given id not found')
        }
    }

    async createProject(projectCreateInput: CreateProjectInput): Promise<Project> {
        const createdProject = new this.projectModel(projectCreateInput);
        const savedProject = await createdProject.save();
        return savedProject.toObject();
    }

    async deleteProject(id: string): Promise<Project> {
        try {
            if (!id) {
                throw new NotFoundException('Project id is required');
            }
            const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();

            if (!deletedProject._id) {
                throw new NotFoundException('Project with given id not found')
            }
            return deletedProject.toObject();
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('Project with given id not found')
        }
    }

    async updateProject(
        projectUpdateInput: UpdateProjectInput
    ): Promise<Project> {
        const { _id, ...updateFields } = projectUpdateInput;
        return this.projectModel.findByIdAndUpdate(_id, updateFields, { new: true }).exec();
    }
}
