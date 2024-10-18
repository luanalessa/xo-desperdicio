import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/domain/models/food.model';

@Module({
  imports: [TypeOrmModule.forFeature([Food])], 
  exports: [TypeOrmModule], 
})
export class FoodModule {}
