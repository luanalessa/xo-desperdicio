import { Repository } from 'typeorm';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
        where: {id: id}
    });
  }
}
