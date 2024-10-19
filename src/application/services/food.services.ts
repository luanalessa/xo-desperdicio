// src/application/services/food.service.ts
import { Injectable } from '@nestjs/common';
import { FoodRepository } from '../../domain/repositories/food.repository';
import { CreateFoodDto } from '../dto/food.dto';
import { Food } from '../../domain/models/food.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    const food = this.foodRepository.create(createFoodDto); 
    return await this.foodRepository.save(food);
  }

  async getAllFoods(): Promise<Food[]> {
    return await this.foodRepository.find();
  }

  async getFoodById(id: string): Promise<Food | null> {
    return await this.foodRepository.findOne({ where: { id } });
  }
}
