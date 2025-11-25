/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsOptional, IsNotEmpty } from "class-validator";

export class CreateCafeDto {
    @IsString()
    @IsNotEmpty()
    cafeName: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsOptional()
    operatingHours: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    description: string;

    @IsOptional()
    cafeType: string;

    
    @IsOptional()
    ambiance: string;

}