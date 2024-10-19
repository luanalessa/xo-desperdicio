import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, IsEnum } from 'class-validator';
import { FoodStatus } from 'src/domain/enums/food.status';
import { FoodType } from 'src/domain/enums/food.type';

export class CreateFoodDto {
  @ApiProperty({
    description: 'Food name',
    example: 'banana',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Expiration date of the food item',
    example: '2024-12-31',
  })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({
    description: 'Weight of the food item in kilograms',
    example: 1.5,
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    description: 'Quantity of the food item',
    example: 10,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'ID of the donor providing the food',
    example: 'abc123',
  })
  @IsString()
  donorId: string;
}
