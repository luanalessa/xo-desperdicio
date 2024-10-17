import { Module } from '@nestjs/common';
import { DonationService } from 'src/application/services/donation.services';
import { DonationController } from '../controllers/donation.controller';


@Module({
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService], 
})
export class DonationsModule {}
