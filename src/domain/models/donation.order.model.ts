import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DonationStatus } from "../enums/donation.status";

@Entity()
export class DonationOrder {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    requesterId: string | null;

    @Column()
    foodId: string;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp' })
    orderDate: Date | null;

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
        this.donationDate = null;
        this.status = DonationStatus.PENDING;
        this.orderDate = new Date();
    }
}
