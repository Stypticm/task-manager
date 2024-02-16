import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, Length } from 'class-validator';

@InputType()
export class CreateTaskInput {
    @IsAlpha()
    @Length(6, 15)
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    assignedTo: string;

    @Field()
    status: string;
}

@InputType()
export class UpdateTaskInput extends PartialType(OmitType(CreateTaskInput, ['title', 'description'])) {
    @Field(() => ID)
    _id: string;
}