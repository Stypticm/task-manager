import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';

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
                throw new NotFoundException('User id is required');
            }
            const user = await this.userModel.findById(id).exec();

            if (!user._id) {
                throw new NotFoundException('User with given id not found')
            }
            return user.toObject();
        } catch (error) { 
            throw new NotFoundException('User with given id not found')
        }
    }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const { username, email, password } = createUserInput;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);


        const createdUser = new this.userModel({
            username,
            email,
            password: hashedPassword,
            salt
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
        } else {
            throw new NotFoundException('Invalid username or email');
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new NotFoundException('Invalid password');
        }

        return user.toObject();
    }

    async deleteUser(id: string): Promise<User> {
        try {
            if (!id) {
                throw new NotFoundException('User id is required');
            }
            const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

            if (!deletedUser._id) {
                throw new NotFoundException('User with given id not found')
            }
            return deletedUser.toObject();
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('User with given id not found')
        }      
    }

    // constructor(
    //     @InjectModel(User.name) private readonly userModel: Model<User>,
    //     private readonly jwtService: JwtService,
    //   ) {}

    //   async updateUser(token: string, username: string, email: string, password: string): Promise<User> {
    //     const decodedToken = this.jwtService.verify(token);
    //     const userId = decodedToken.sub; // предположим, что идентификатор пользователя сохранен в поле sub токена

    //     const saltRounds = 10;
    //     const salt = await bcrypt.genSalt(saltRounds);
    //     const hashedPassword = await bcrypt.hash(password, salt);

    //     const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
    //       username,
    //       email,
    //       password: hashedPassword,
    //       salt
    //     }).exec();

    //     return updatedUser.toObject();
    //   }
}
