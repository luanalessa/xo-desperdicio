import { Injectable } from '@nestjs/common';
import { Food } from 'src/domain/models/food.model';  
import { CreateDonationOrderDto } from 'src/application/dto/donation.order.dto';  
import { UpdateDonationStatusDto } from 'src/application/dto/update.donation.status.dto'; 
import { DonationOrder } from 'src/domain/models/donation.order.model';  
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationOrder) 
    private readonly donationOrderRepository: Repository<DonationOrder>,

    @InjectRepository(Food) 
    private readonly foodRepository: Repository<Food>, 
  ) {}

  async getDonationOrders(): Promise<DonationOrder[]> {
    return await this.donationOrderRepository.find(); 
  }

  async getDonationOrderById(orderId: string): Promise<DonationOrder | null> {
    const donationOrder = await this.donationOrderRepository.findOne({ where: { id: orderId } }); 
    
    if (!donationOrder) {
      throw new Error('Donation order not found');
    }

    return donationOrder;
  }

  async createDonationOrder(createOrderDto: CreateDonationOrderDto): Promise<DonationOrder> {
    const { foodId, quantity, requesterId } = createOrderDto;

    const foodItem = await this.foodRepository.findOne({ where: { id: foodId } }); 
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
    const donationOrder = await this.donationOrderRepository.findOne({ where: { id: updateStatusDto.donationOrderId } }); 

    if (!donationOrder) {
      throw new Error('Donation order not found');
    }

    donationOrder.status = updateStatusDto.status;

    return await this.donationOrderRepository.save(donationOrder);
  }
}
