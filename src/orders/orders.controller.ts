import {Controller, Get, Post, Body, Param, Patch, Delete, UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto} from "./create-order.dto";
import { UpdateOrderStatusDto} from "./update-order-status.dto";
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
 
  
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  findAllOrders() {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  findOrderById(@Param('id') id: number) {
    return this.ordersService.findOrderById(id);
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
  }

  @Delete(':id')
  removeOrder(@Param('id') id: number) {
    return this.ordersService.removeOrder(id);
  }
}