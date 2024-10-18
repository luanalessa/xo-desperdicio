import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ description: 'Street of the address' })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({ description: 'Number of the address' })
    @IsNotEmpty()
    @IsString()
    number: string;

    @ApiProperty({ description: 'City of the address' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ description: 'Neighborhood of the address' })
    @IsNotEmpty()
    @IsString()
    neighborhood: string;

    @ApiProperty({ description: 'Postal code of the address' })
    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @ApiProperty({ description: 'State of the address' })
    @IsNotEmpty()
    @IsString()
    state: string;
}
