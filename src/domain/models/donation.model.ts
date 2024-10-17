import { DonationStatus } from "../enums/donation.status";

export class Donation {
    id: string; 
    donorId: string; 
    recipientId: string; 
    donationId: string;
    donationDate: Date;
    donationConfirmedDate: Date;
    status: DonationStatus; 

    constructor(
        id: string,
        donorId: string,
        recipientId: string | null,
        donationId: string,
        donationDate: Date,
    ) {
        this.id = id;
        this.donationId = donationId;
        this.recipientId = recipientId;
        this.status = DonationStatus.PENDING;
    }
  }
  