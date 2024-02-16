import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Team extends Document {
    _id: MongooseSchema.Types.ObjectId

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    admin?: string;

    @Prop({ type: Types.ObjectId, ref: 'Team', default: [] })
    members?: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team)