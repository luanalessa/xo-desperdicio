import { ApiProperty } from '@nestjs/swagger';

export class CreateDonationOrderDto {
  @ApiProperty({
    description: 'ID of the food item being requested',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  foodId: string;

  @ApiProperty({
    description: 'Quantity of the food item being requested',
    example: 3,
  })
  quantity: number;

  @ApiProperty({
    description: 'ID of the user requesting the donation',
    example: 'user123e4567-e89b-12d3-a456-426614174000',
  })
  requesterId: string;
}
