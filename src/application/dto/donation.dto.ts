import { ApiProperty } from '@nestjs/swagger';


export class FoodDto {
  @ApiProperty({
    description: 'Unique identifier for the food item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Type of food being donated (e.g., fruits, vegetables, canned goods)',
    example: 'Fruits',
  })
  foodType: string;

  @ApiProperty({
    description: 'Expiration date of the food item',
    example: '2024-12-01',
    type: Date,
  })
  expirationDate: Date;

  @ApiProperty({
    description: 'Weight of the food item in kilograms',
    example: 5.5,
  })
  weight: number;

  @ApiProperty({
    description: 'Quantity of the food item being donated',
    example: 10,
  })
  quantity: number;

  @ApiProperty({
    description: 'ID of the donor who is donating the food item',
    example: 'donor123e4567-e89b-12d3-a456-426614174000',
  })
  donorId: string;
}
