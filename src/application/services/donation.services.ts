import { Injectable } from '@nestjs/common';
import { Food } from '../../domain/models/food.model';
import { CreateDonationOrderDto } from '../dto/donation.order.dto';
import { UpdateDonationStatusDto } from '../dto/update.donation.status.dto';

@Injectable()
export class DonationService {
  private donations: Food[] = [];
  private donationOrders: any[] = [];

  createDonation(food: Food): Food {
    this.donations.push(food);
    return food;
  }

  getDonations(): Food[] {
    return this.donations;
  }

  createDonationOrder(createOrderDto: CreateDonationOrderDto): any {
    const { foodId, quantity, requesterId } = createOrderDto;

    // Encontra o item de doação pelo ID
    const donation = this.donations.find(item => item.id === foodId);
    if (!donation) {
      throw new Error('Donation not found');
    }

    // Verifica se a quantidade está disponível
    if (donation.quantity < quantity) {
      throw new Error('Insufficient quantity available');
    }

    donation.quantity -= quantity;

    const donationOrder = {
      orderId: 'new-order-id', 
      foodId: donation.id,
      quantity,
      requesterId,
      status: 'PENDING', 
    };

    return donationOrder;
  }

  updateDonationStatus(donationOrderId: string, updateStatusDto: UpdateDonationStatusDto): any {
    const donationOrder = this.donationOrders.find(order => order.orderId === donationOrderId);

    if (!donationOrder) {
      throw new Error('Donation order not found');
    }

    donationOrder.status = updateStatusDto.status;
    donationOrder.notes = updateStatusDto.notes || '';

    return donationOrder;
  }
}
