// src/infrastructure/repositories/food.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../../domain/models/food.model';
import { FoodRepository } from '../../domain/repositories/food.repository';

@Injectable()
export class FoodRepositoryImpl implements FoodRepository {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async save(food: Food): Promise<Food> {
    return await this.foodRepository.save(food);
  }

  async findAll(): Promise<Food[]> {
    return await this.foodRepository.find();
  }

  async findById(id: string): Promise<Food | null> {
    return await this.foodRepository.findOne({ where: { id } });
  }
}
