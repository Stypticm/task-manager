import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Project extends Document {
    _id: MongooseSchema.Types.ObjectId

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    assignedTo?: string;

    @Prop({ type: String, enum: ['high', 'medium', 'low', 'hold'], default: 'medium' })
    status: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project)