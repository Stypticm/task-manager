import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
    @IsAlpha()
    @Length(6, 15)
    @Field()
    username: string;
    
    @IsEmail()
    @Field()
    email: string;
    
    @Field()
    password: string;
}