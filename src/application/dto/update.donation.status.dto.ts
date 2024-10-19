import { ApiProperty } from '@nestjs/swagger';
import { DonationStatus } from '../enums/donation.status';

export class UpdateDonationStatusDto {
  @ApiProperty({
    description: 'Status of the donation (APPROVED or REJECTED)',
    example: 'COMPLETED | PENDING | CANCELLED',
  })
  status: DonationStatus

  @ApiProperty({
    description: 'Donation order id',
    example: '1',
  })
  donationOrderId: string
}
