import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email-sender/email-sender.module';
import { UserModule } from './user/user.module';
import { IsExistMiddleware } from './middlewares/is-exist.middleware';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { PaymentModule } from './payment/payment.module';

@Module({
	imports: [PrismaModule, AuthModule, EmailModule, UserModule, ProductModule, OrderModule, OrderDetailModule, PaymentModule],
	controllers: [AppController],
	providers: [AppService, ProductService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IsExistMiddleware)
			.forRoutes({ path: 'some-route/:id', method: RequestMethod.ALL });
	}
}
