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

  // Rota para pegar todos os pedidos de doação
  @Get()
  async getAllDonationOrders(): Promise<DonationOrder[]> {
    return await this.donationService.getDonationOrders();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do pedido de doação' })
  async getDonationOrderById(@Param('id') id: string): Promise<DonationOrder> {
    return await this.donationService.getDonationOrderById(id);
  }

  @Post('request')
  @ApiBody({ type: CreateDonationOrderDto })
  async createDonationOrder(@Body() createOrderDto: CreateDonationOrderDto): Promise<DonationOrder> {
    return await this.donationService.createDonationOrder(createOrderDto);
  }

  @Put('update-status/:donationOrderId')
  @ApiBody({ type: UpdateDonationStatusDto })
  async updateDonationStatus(
    @Body() updateStatusDto: UpdateDonationStatusDto,
  ): Promise<DonationOrder> {
    return await this.donationService.updateDonationStatus(updateStatusDto);
  }
}
