import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products/entities/product.entity";
import { OrdersModule } from './orders/orders.module';
import { Order } from "./orders/entities/order.entity";
import { OrderItem } from "./orders/entities/order-item.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [Product, Order, OrderItem],
      synchronize: true,
      logging: true,
    }),
    ProductsModule,
    OrdersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
