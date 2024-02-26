import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { sign } from 'jsonwebtoken'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        if (!this.userModel) {
            return [];
        }
        return await this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User> {
        try {

            if (!id) {
                return null;
            }
            const user = await this.userModel.findById(id).exec();

            return user ? user.toObject() : null;
        } catch (error) {
            throw new NotFoundException('User with given id not found')
        }
    }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const { username, email, password } = createUserInput;

        const saltRounds = 10;
        // const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = new this.userModel({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await createdUser.save();
        return savedUser.toObject();
    }

    async validateUser(field: string, password: string): Promise<User | null> {
        let user;

        if (field.includes('@')) {
            user = await this.userModel.findOne({ email: field }).exec();
        } else if (!field.includes('@')) {
            user = await this.userModel.findOne({ username: field }).exec();
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        const token = sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return { ...user.toObject(), token };
    }

    async deleteUser(id: string): Promise<User> {
        try {
            if (!id) {
                return null;
            }
            const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

            return deletedUser ? deletedUser.toObject() : null;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('User with given id not found')
        }
    }
}
