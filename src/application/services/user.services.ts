import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/models/user.model';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
