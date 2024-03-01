import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class User {
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId

    @Field()
    username: string;
    
    @Field()
    email: string;

    @Field()
    token?: string;

    @Field()
    encryptedData?: string;
    
    @Field()
    password: string;
    
    @Field(type => Date)
    createdAt: Date;
    
    @Field(type => Date, { nullable: true })
    updatedAt?: Date;
    
    @Field(type => [String], { nullable: true })
    tasks?: MongooseSchema.Types.ObjectId[];
    
    @Field(type => [String], { nullable: true })
    team?: MongooseSchema.Types.ObjectId[];
}