import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonationOrder } from 'src/domain/models/donation.order.model';
import { DonationOrderRepository } from 'src/domain/repositories/donation.order.repository';
import { DonationStatus } from 'src/application/enums/donation.status';

@Injectable()
export class DonationOrderRepositoryImpl implements DonationOrderRepository {
  constructor(
    @InjectRepository(DonationOrder)
    private readonly donationOrderRepository: Repository<DonationOrder>,
  ) {}

  async save(donationOrder: DonationOrder): Promise<DonationOrder> {
    return await this.donationOrderRepository.save(donationOrder);
  }

  async findAll(): Promise<DonationOrder[]> {
    return await this.donationOrderRepository.find();
  }

  async findById(id: string): Promise<DonationOrder | null> {
    return await this.donationOrderRepository.findOne({
      where: { id },
    });
  }

  async updateStatus(id: string, status: DonationStatus): Promise<DonationOrder> {
    const donationOrder = await this.donationOrderRepository.findOne({ where: { id } });
    
    if (!donationOrder) {
      throw new Error('Donation order not found');
    }

    donationOrder.status = status; // Atualiza o status
    return await this.donationOrderRepository.save(donationOrder); 
  }
}
