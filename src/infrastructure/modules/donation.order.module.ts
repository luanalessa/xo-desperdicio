import { Module } from '@nestjs/common';
import { DonationService } from 'src/application/services/donation.services';
import { DonationController } from '../controllers/donation.controller';
import { DonationOrder } from 'src/domain/models/donation.order.model';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([DonationOrder])],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService], 
})
export class DonationOrderModule {}
