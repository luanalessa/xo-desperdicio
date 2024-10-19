import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/domain/enums/user.type';
import { Address } from 'src/domain/models/valueObjects/adress';
import { CreateAddressDto } from './address.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1 555-555-5555',
  })
  phone: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'strongPassword123',
  })
  password: string;

  @ApiProperty({
    description: 'Address of the user',
    type: CreateAddressDto,
  })
  address: CreateAddressDto;

  @ApiProperty({
    enum: UserType,
    enumName: 'UserType',
    description: 'Indicates whether the user is a normal account or a business account',
    example: `${UserType.BUSINESS} | ${UserType.NORMAL}`,
  })
  type: UserType;
}
