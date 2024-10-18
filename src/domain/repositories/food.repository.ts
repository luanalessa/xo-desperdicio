import { Food } from '../models/food.model';

export interface FoodRepository {
  save(food: Food): Promise<Food>;
  findAll(): Promise<Food[]>;
  findById(id: string): Promise<Food | null>;
}
