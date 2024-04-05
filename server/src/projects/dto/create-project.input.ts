import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsAlpha, Length } from 'class-validator';

@InputType()
export class CreateProjectInput {
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
export class UpdateProjectInput extends PartialType(OmitType(CreateProjectInput, ['title', 'description', 'status'])) {
    @Field(() => ID)
    _id: string;
}