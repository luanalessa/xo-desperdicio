import { Injectable } from '@nestjs/common';
import { Food } from '../../domain/models/food.model';
import { CreateDonationOrderDto } from '../dto/donation.order.dto';
import { UpdateDonationStatusDto } from '../dto/update.donation.status.dto';
import { DonationOrder } from 'src/domain/models/donation.order.model';
import { DonationOrderRepository } from 'src/domain/repositories/donation.order.repository';
import { FoodRepository } from 'src/domain/repositories/food.repository'; // Adicione a importação

@Injectable()
export class DonationService {
  constructor(
    private readonly donationOrderRepository: DonationOrderRepository,
    private readonly foodRepository: FoodRepository, 
  ) {}

  async getDonationOrders(): Promise<DonationOrder[]> {
    return await this.donationOrderRepository.findAll();
  }

  async getDonationOrderById(orderId: string): Promise<DonationOrder | null> {
    const donationOrder = await this.donationOrderRepository.findById(orderId);
    
    if (!donationOrder) {
      throw new Error('Donation order not found');
    }

    return donationOrder;
  }

  async createDonationOrder(createOrderDto: CreateDonationOrderDto): Promise<DonationOrder> {
    const { foodId, quantity, requesterId } = createOrderDto;

    // Use o repositório de Food para buscar o alimento
    const foodItem = await this.foodRepository.findById(foodId);
    if (!foodItem) {
      throw new Error('Food item not found');
    }

    if (foodItem.quantity < quantity) {
      throw new Error('Insufficient quantity available');
    }

    foodItem.quantity -= quantity;

    const donationOrder = new DonationOrder(
      quantity,
      requesterId,
      foodId
    );

    return await this.donationOrderRepository.save(donationOrder);
  }

  async updateDonationStatus(updateStatusDto: UpdateDonationStatusDto): Promise<DonationOrder> {
    const donationOrder = await this.donationOrderRepository.findById(updateStatusDto.donationOrderId);

    if (!donationOrder) {
      throw new Error('Donation order not found');
    }

    donationOrder.status = updateStatusDto.status;

    return await this.donationOrderRepository.save(donationOrder);
  }
}
