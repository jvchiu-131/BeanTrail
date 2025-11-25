/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cafe, CafeSchema } from './schema/cafeSchema/cafe.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { 
          name: Cafe.name, 
          schema: CafeSchema 
        }
      ]),
  ],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
