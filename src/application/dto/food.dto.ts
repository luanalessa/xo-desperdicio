import { IsString, IsDate, IsNumber, IsEnum } from 'class-validator';
import { FoodStatus } from 'src/domain/enums/food.status';

export class CreateFoodDto {
  @IsString()
  foodType: string;

  @IsDate()
  expirationDate: Date;

  @IsNumber()
  weight: number;

  @IsNumber()
  quantity: number;

  @IsString()
  donorId: string;

  @IsEnum(FoodStatus)
  status: FoodStatus;
}
