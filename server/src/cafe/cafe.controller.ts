/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './dto/createCafe.dto';

@Controller('cafe')
export class CafeController {
    constructor(
        private readonly cafeService: CafeService
    ) {}

    @Post()
    async createCafe(@Body() createCafeDto: CreateCafeDto) {
        return this.cafeService.createCafe(createCafeDto);
        console.log("Created a new cafe");
    }

    @Get()
    async getCafe() {
        console.log("Fetched all cafes");
        return this.cafeService.getCafe();
    }

    @Get(':id')
    async getCafeById(id: string) {
        console.log(`Fetched cafe with id: ${id}`);
        return this.cafeService.getCafeById(id);
    }
}
