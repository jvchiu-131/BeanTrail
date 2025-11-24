/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cafe } from 'src/cafe/schema/cafeSchema/cafe.schema';
import { CreateCafeDto } from './dto/createCafe.dto';

@Injectable()
export class CafeService {
    constructor(@InjectModel(Cafe.name) private cafeModel: Model<Cafe>) {}

     //creates a new user
    createCafe(createCafeDto: CreateCafeDto): Promise<Cafe> {
        const newCafe = new this.cafeModel(createCafeDto);
        return newCafe.save();
    }

    async getCafe(): Promise<Cafe[]> {
        return this.cafeModel.find().exec();
    }

    async getCafeById(id: string){
        return this.cafeModel.findById(id).exec();
    }
}
