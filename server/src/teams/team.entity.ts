import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class Team {
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => ID, { nullable: true })
    admin?: string;

    @Field(() => [String], { nullable: true })
    members?: MongooseSchema.Types.ObjectId[];
}