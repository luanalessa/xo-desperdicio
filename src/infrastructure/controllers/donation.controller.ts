import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { DonationService } from '../../application/services/donation.services';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateDonationOrderDto } from 'src/application/dto/donation.order.dto';
import { UpdateDonationStatusDto } from 'src/application/dto/update.donation.status.dto';
import { DonationOrder } from 'src/domain/models/donation.order.model';

@ApiTags('donations')
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async createDonation(): Promise<DonationOrder[]> {
    return await this.donationService.getDonationOrders();
  }

  @Get()
  async getDonationOrder(@Body() id: string): Promise<DonationOrder> {
    return await this.donationService.getDonationOrderById(id);
  }

  @Post('request')
  @ApiBody({ type: CreateDonationOrderDto })
  createDonationOrder(@Body() createOrderDto: CreateDonationOrderDto): any {
    return this.donationService.createDonationOrder(createOrderDto);
  }

  @Put('update-status/:donationOrderId')
  @ApiParam({ name: 'donationOrderId', description: 'ID of the donation order to update' })
  @ApiBody({ type: UpdateDonationStatusDto })
  updateDonationStatus(
    @Param('donationOrderId') donationOrderId: string,
    @Body() updateStatusDto: UpdateDonationStatusDto,
  ): any {
    return this.donationService.updateDonationStatus(updateStatusDto);
}
}
