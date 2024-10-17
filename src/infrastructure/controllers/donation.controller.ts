import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { DonationService } from '../../application/services/donation.services';
import { Food } from '../../domain/models/food.model';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateDonationOrderDto } from 'src/application/dto/donation.order.dto';
import { UpdateDonationStatusDto } from 'src/application/dto/update.donation.status.dto';

@ApiTags('donations')
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  createDonation(@Body() donation: Food): Food {
    return this.donationService.createDonation(donation);
  }

  @Get()
  getDonations(): Food[] {
    return this.donationService.getDonations();
  }

  @Post('request')
  @ApiBody({ type: CreateDonationOrderDto })
  requestDonation(@Body() createOrderDto: CreateDonationOrderDto): any {
    return this.donationService.createDonationOrder(createOrderDto);
  }

  @Put('update-status/:donationOrderId')
  @ApiParam({ name: 'donationOrderId', description: 'ID of the donation order to update' })
  @ApiBody({ type: UpdateDonationStatusDto })
  updateDonationStatus(
    @Param('donationOrderId') donationOrderId: string,
    @Body() updateStatusDto: UpdateDonationStatusDto,
  ): any {
    return this.donationService.updateDonationStatus(donationOrderId, updateStatusDto);
}
}
