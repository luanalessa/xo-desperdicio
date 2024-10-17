import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
