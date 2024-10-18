import { DonationOrder } from "../models/donation.order.model";

export interface DonationOrderRepository {
  save(donation: DonationOrder): Promise<DonationOrder>;
  findAll(): Promise<DonationOrder[]>;
  findById(id: string): Promise<DonationOrder | null>;
}
