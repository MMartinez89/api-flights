import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RoleDocument = Role & mongoose.Document;
@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, trim: true, unique: true, lowercase: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
