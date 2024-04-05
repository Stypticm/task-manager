import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
    _id: MongooseSchema.Types.ObjectId

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ default: null })
    token?: string;

    @Prop({ default: null })
    encryptedData?: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'Task', default: [] })
    tasks?: string[];

    @Prop({ type: Types.ObjectId, ref: 'Team', default: [] })
    teams?: string[];

    @Prop({ type: Types.ObjectId, ref: 'Project', default: [] })
    projects?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User)