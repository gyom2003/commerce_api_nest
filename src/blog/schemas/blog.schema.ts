import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  body: string;

  @Prop()
  author: string;

  @Prop()
  date_posted: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
