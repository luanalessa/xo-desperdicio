import { FoodStatus } from '../enums/food.status';

export class Food {
  id: string; 
  foodType: string; 
  expirationDate: Date; 
  weight: number; 
  quantity: number; 
  donorId: string;
  status: FoodStatus; 

  constructor(
    id: string,
    foodType: string,
    expirationDate: Date,
    weight: number,
    quantity: number,
    donorId: string,
    status: FoodStatus
  ) {
    this.id = id;
    this.foodType = foodType;
    this.expirationDate = expirationDate;
    this.weight = weight;
    this.quantity = quantity;
    this.donorId = donorId;
    this.status = status;
  }
}