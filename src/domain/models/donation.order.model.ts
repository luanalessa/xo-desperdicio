import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DonationStatus } from "../enums/donation.status";

@Entity()
export class DonationOrder {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    requesterId: string | null;

    @Column({ unique: true })
    foodId: string;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp' })
    orderDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    donationDate: Date | null;

    @Column({
        type: 'enum',
        enum: DonationStatus,
    })
    status: DonationStatus;

    constructor(
        quantity: number,
        requesterId: string | null,
        foodId: string,
    ) {
        this.requesterId = requesterId;
        this.foodId = foodId;
        this.quantity = quantity;
        this.donationDate = new Date();
        this.status = DonationStatus.PENDING;
        this.donationDate = null;
    }
}
