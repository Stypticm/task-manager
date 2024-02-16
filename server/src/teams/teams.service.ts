import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from './team.entity';
import { CreateTeamInput, UpdateTeamInput } from './dto/create-team.inputs';

@Injectable()
export class TeamsService {
    constructor(@InjectModel('Team') private readonly teamModel: Model<Team>) { }

    async getTeams(): Promise<Team[]> {
        if (!this.teamModel) {
            return [];
        }
        return await this.teamModel.find().exec();
    }

    async getTeamById(id: string): Promise<Team> {
        try {
            if (!id) {
                throw new NotFoundException('Team id is required');
            }
            const team = await this.teamModel.findById(id).exec();

            if (!team._id) {
                throw new NotFoundException('Team with given id not found')
            }
            return team.toObject()
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('Team with given id not found')
        }
    }

    async createTeam(teamCreateInput: CreateTeamInput): Promise<Team> {

        if (!teamCreateInput.admin) {
            teamCreateInput.admin = teamCreateInput._id;
        }

        const createdTeam = new this.teamModel(teamCreateInput);
        const savedTeam = await createdTeam.save();
        return savedTeam.toObject();
    }

    async updateTeam(updateTeamInput: UpdateTeamInput): Promise<Team> {
        const {_id, ...updateFields} = updateTeamInput;
        return await this.teamModel.findByIdAndUpdate(_id, updateFields, {new: true}).exec()
    }

    async deleteTeam(id: string): Promise<Team> {
        try {
            if (!id) {
                throw new NotFoundException('Team id is required');
            }
            const deletedTeam = await this.teamModel.findByIdAndDelete(id).exec();

            if (!deletedTeam._id) {
                throw new NotFoundException('Team with given id not found')
            }
            return deletedTeam.toObject();
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('Team with given id not found')
        }
    }
}
