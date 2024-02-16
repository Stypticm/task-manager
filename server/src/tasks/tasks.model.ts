import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Task extends Document {
    _id: MongooseSchema.Types.ObjectId

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    assignedTo?: string;

    @Prop({ type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' })
    status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task)