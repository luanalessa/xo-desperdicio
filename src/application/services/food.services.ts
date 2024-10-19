import { Injectable } from '@nestjs/common';
import { FoodRepository } from '../../domain/repositories/food.repository';
import { CreateFoodDto } from '../dto/food.dto';
import { Food } from '../../domain/models/food.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodType } from 'src/domain/enums/food.type';
import { FoodStatus } from 'src/domain/enums/food.status';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async createFood(createFoodDto: CreateFoodDto, type: FoodType): Promise<Food> {
    const food = this.foodRepository.create({
      ...createFoodDto,
      foodType: type,
    }); 

    console.log(createFoodDto, type)
    return await this.foodRepository.save(food);
  }

  async getAllFoods(): Promise<Food[]> {
    return await this.foodRepository.find();
  }

  async getFoodsByType(type: FoodType): Promise<Food[]> {
    return await this.foodRepository.find({
      where: { foodType: type, status: FoodStatus.AVAILABLE },
    });
}
}
