import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateFoodDto } from '../../application/dto/food.dto';
import { Food } from '../../domain/models/food.model';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { FoodService } from 'src/application/services/food.services';
import { FoodType } from 'src/domain/enums/food.type';

@ApiTags('foods')
@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post(':type')
  @ApiQuery({
    name: 'type',
    enum: FoodType, 
    description: 'Type of food',
    required: true,
  })
  async createFood(@Query('type') type: FoodType, @Body() createFoodDto: CreateFoodDto): Promise<Food> {
    console.log(type);
    return await this.foodService.createFood(createFoodDto, type);
  }

  @Get()
  async getAllFoods(): Promise<Food[]> {
    return await this.foodService.getAllFoods();
  }

  @Get(':type')
  @ApiQuery({
    name: 'type',
    enum: FoodType, 
    description: 'Type of food',
    required: true,
  })
  async getFoodsByType(@Query('type') type: FoodType): Promise<Food[] | null> {
    return await this.foodService.getFoodsByType(type);
  }
}
