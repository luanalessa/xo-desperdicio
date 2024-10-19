import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '../../application/services/user.services';
import { User } from '../../domain/models/user.model';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.registerUser(user);
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
