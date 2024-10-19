import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateFoodDto } from '../../application/dto/food.dto';
import { Food } from '../../domain/models/food.model';
import { ApiTags } from '@nestjs/swagger';
import { FoodService } from 'src/application/services/food.services';
import { FoodType } from 'src/domain/enums/food.type';

@ApiTags('foods')
@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async createFood(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return await this.foodService.createFood(createFoodDto);
  }

  @Get()
  async getAllFoods(): Promise<Food[]> {
    return await this.foodService.getAllFoods();
  }

  @Get(':type')
  async getFoodsByType(@Param('type') type: FoodType): Promise<Food[] | null> {
    return await this.foodService.getFoodsByType(type);
  }
}
