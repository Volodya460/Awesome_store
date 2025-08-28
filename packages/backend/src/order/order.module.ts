import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { OrderDetailModule } from '@/order-detail/order-detail.module';

@Module({
	imports: [PrismaModule, OrderDetailModule],
	providers: [OrderService],
	controllers: [OrderController],
})
export class OrderModule {}
