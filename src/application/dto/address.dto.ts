import { ApiProperty } from '@nestjs/swagger';

export class CreateAddress {
  @ApiProperty({ description: 'Street address', example: '123 Main St' })
  street: string;

  @ApiProperty({ description: 'City', example: 'New York' })
  city: string;

  @ApiProperty({ description: 'State or region', example: 'NY' })
  state: string;

  @ApiProperty({ description: 'Postal code', example: '10001' })
  zipCode: string;
}
