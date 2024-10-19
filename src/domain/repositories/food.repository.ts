import { FoodType } from '../enums/food.type';
import { Food } from '../models/food.model';

export interface FoodRepository {
  save(food: Food): Promise<Food>;
  findAll(): Promise<Food[]>;
  findByType(type: FoodType): Promise<Food[] | []>; 
}
