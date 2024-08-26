import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Category } from './products/category.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order.entity';
import { OrdersModule } from './orders/orders.module';
import { Cart, CartItem } from './cart/cart.entity';
import { Review } from './reviews/review.entity';
import { CartModule } from './cart/cart.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Wishlist } from './wishlist/wishlist.entity';
import { Notification } from './notifications/notification.entity';
import { ReportsService } from './reports/reports.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [User, Product, Category, Order, OrderItem,Cart, CartItem, Review, Wishlist, Notification],
      synchronize: true,
    }),
  UsersModule,
  User,
  Category,
  OrderItem,
  Order,
  CartItem,
  Review,
  AuthModule,
  Product,
  ProductsModule,
  OrdersModule,
  CartModule,
  ReviewsModule,
  Wishlist,
  Notification,
  ReportsService
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
