import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @IsString()
  @Prop({ required: true })
  title: string;

  @IsString()
  @Prop({ required: true })
  description: string;

  @IsString()
  @Prop({ required: true })
  body: string;

  @IsString()
  @Prop({ required: true })
  author: string;

  @Prop()
  date_posted: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
