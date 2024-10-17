import { Injectable } from '@nestjs/common';
import { Food } from '../../domain/models/food.model';

@Injectable()
export class ReportService {
  generateReport(donations: Food[]): any {

    return {
      totalDonations: donations.length,
      donations,
    };
  }
}
