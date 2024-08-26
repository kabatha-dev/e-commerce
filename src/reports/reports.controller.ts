import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('reports')
@UseGuards(RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @Roles(Role.Admin)
  getSalesReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    // Convert query parameters to Date objects and handle invalid dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the date conversion resulted in a valid date
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return this.reportsService.getSalesReport(start, end);
  }

  @Get('analytics')
  @Roles(Role.Admin)
  getAnalytics() {
    return this.reportsService.getAnalytics();
  }
}
