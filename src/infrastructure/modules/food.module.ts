import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/domain/models/food.model';
import { FoodController } from '../controllers/food.controller';
import { FoodService } from 'src/application/services/food.services';


@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [TypeOrmModule],
})
export class FoodModule {}
