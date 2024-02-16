import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class Task {
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => ID, { nullable: true })
    assignedTo?: string;

    @Field()
    status: string;
}