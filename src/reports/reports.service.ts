import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getSalesReport(startDate: Date, endDate: Date) {
    const orders = await this.ordersRepository.createQueryBuilder('order')
      .where('order.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();

    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalOrders = orders.length;

    return { totalSales, totalOrders, orders };
  }

  async getAnalytics() {
    const totalUsers = await this.ordersRepository.query('SELECT COUNT(*) FROM user');
    const totalProducts = await this.ordersRepository.query('SELECT COUNT(*) FROM product');
    const totalOrders = await this.ordersRepository.query('SELECT COUNT(*) FROM "order"');

    return { totalUsers: totalUsers[0].count, totalProducts: totalProducts[0].count, totalOrders: totalOrders[0].count };
  }
}