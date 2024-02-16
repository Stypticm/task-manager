import { Field, ID, InputType } from '@nestjs/graphql';
import { IsAlpha, Length } from 'class-validator';

@InputType()
export class CreateTeamInput {
    @Field(() => ID)
    _id?: string

    @IsAlpha()
    @Length(6, 15)
    @Field()
    name: string

    @Field()
    description: string
    
    @Field()
    admin: string

    @Field(() => [String])
    members?: string[]
}

@InputType()
export class UpdateTeamInput {
    @Field(() => ID)
    _id: string

    @Field(() => [String])
    members?: string[]
}