/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cafe extends Document {

  @Prop({ required: true })
  cafeName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  operatingHours: string;

  @Prop({ isEmail: true, unique: true })
  email: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  cafeType: string;

  @Prop({ required: false })
  ambiance: string;

}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
