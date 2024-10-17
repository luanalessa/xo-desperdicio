import { ApiProperty } from '@nestjs/swagger';

export class UpdateDonationStatusDto {
  @ApiProperty({
    description: 'Status of the donation (APPROVED or REJECTED)',
    example: 'APPROVED',
  })
  status: 'APPROVED' | 'REJECTED';

  @ApiProperty({
    description: 'Additional notes or reason for rejection (if applicable)',
    example: 'Food expired, unable to donate',
    required: false,
  })
  notes?: string;
}
