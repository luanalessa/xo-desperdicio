import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../../domain/models/food.model';
import { FoodRepository } from '../../domain/repositories/food.repository';
import { FoodType } from 'src/domain/enums/food.type';
import { FoodStatus } from 'src/domain/enums/food.status';

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

  async findByType(type: FoodType): Promise<Food[]> {
    return this.foodRepository.find({
      where: { foodType: type, status: FoodStatus.AVAILABLE }, 
    });
}
}
