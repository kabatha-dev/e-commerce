import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderStatusDto } from './update-order-status.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { getManager } from 'typeorm';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({ where: { id }, relations: ['user', 'items', 'items.product'] });
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items } = createOrderDto;

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orderItems: OrderItem[] = [];
    let total = 0;

    for (const item of items) {
      const product = await this.productsService.findProductById(item.productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }
      const orderItem = this.orderItemsRepository.create({
        product,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });
      orderItems.push(orderItem);
      total += orderItem.price;
    }

    const order = this.ordersRepository.create({
      user,
      status: 'placed',
      total,
      items: orderItems,
    });

    await this.orderItemsRepository.save(orderItems); // Save order items first
    return this.ordersRepository.save(order);
  }

  async updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.findOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = updateOrderStatusDto.status;
    return this.ordersRepository.save(order);
  }

  async removeOrder(id: number): Promise<void> {
    const order = await this.findOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.ordersRepository.remove(order);
  }

  private async findOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    // Load the related entities
    const entityManager = getManager();
    const fullOrder = await entityManager.findOne(Order, id, { relations: ['user', 'items', 'items.product'] });
  
    return fullOrder;
  }
}
