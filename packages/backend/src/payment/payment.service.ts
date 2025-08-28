import {
	Injectable,
	ForbiddenException,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { PaymentTransactionStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
	constructor(private prisma: PrismaService) {}

	async createPayment(dto: CreatePaymentDto, userId: string) {
		const order = await this.prisma.order.findUnique({
			where: { order_id: dto.order_id },
		});

		if (!order || order.user_id !== userId) {
			throw new ForbiddenException('Order not found or access denied');
		}
		if (order.payment_status === 'COMPLETE') {
			throw new HttpException(
				{ message: 'Order has already been paid' },
				HttpStatus.CONFLICT,
			);
		}

		const status: PaymentTransactionStatus = this.getRandomStatus();
		const transaction_id = randomUUID();

		const payment = await this.prisma.payment.create({
			data: {
				order_id: dto.order_id,
				total_amount: order.total_amount,
				payment_status: status,
				transaction_id,
			},
		});

		await this.prisma.order.update({
			where: { order_id: dto.order_id },
			data: {
				payment_status: status === 'SUCCESS' ? 'COMPLETE' : 'FAILED',
			},
		});

		return {
			payment_status: status,
			message:
				status === 'SUCCESS'
					? 'Payment completed successfully.'
					: 'Payment failed.',
		};
	}

	private getRandomStatus(): PaymentTransactionStatus {
		const statuses: PaymentTransactionStatus[] = ['SUCCESS', 'FAILED'];
		return statuses[Math.floor(Math.random() * statuses.length)];
	}
}
