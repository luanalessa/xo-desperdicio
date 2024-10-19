import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from '../../application/services/user.services';
import { User } from '../../domain/models/user.model';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dto/user.dto';
import { UserType } from '@domain/enums/user.type';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':type')
  @ApiQuery({
    name: 'type',
    enum: UserType, 
    description: 'Type of user',
    required: true,
  })  registerUser(@Query('type') type: UserType, @Body() user: CreateUserDto): Promise<User> {
    return this.userService.registerUser(user, type);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return await this.userService.getUserById(id);
  }
}
