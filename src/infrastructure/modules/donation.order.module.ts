import { Module } from '@nestjs/common';
import { DonationService } from 'src/application/services/donation.services';
import { DonationController } from '../controllers/donation.controller';
import { DonationOrder } from 'src/domain/models/donation.order.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodModule } from './food.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DonationOrder]), // Register the entity here
    FoodModule,  // Importando o módulo que contém FoodRepository
  ],
  controllers: [DonationController],
  providers: [DonationService],  // No need to add repositories here
  exports: [DonationService],
})
export class DonationOrderModule {}
