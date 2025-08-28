import { PrismaService } from '@/prisma/prisma.service';
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { CreateOrderDto, FilterOrderDto } from './dto/order.dto';
import { PaymentStatus, DeliveryStatus } from '@prisma/client';

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async getOrders(user_id: string, filters: FilterOrderDto) {
		const { payment, delivery, orderByDate } = filters;

		return this.prisma.order.findMany({
			where: {
				user_id,
				...(payment && { payment_status: payment }),
				...(delivery && { delivery_status: delivery }),
			},
			orderBy: {
				createdAt: orderByDate || 'desc',
			},
			include: {
				order_details: true,
			},
		});
	}

	async createOrder(user_id: string, dto: CreateOrderDto) {
		const { payment_status, delivery_status } = dto;

		const cartItems = await this.prisma.orderDetail.findMany({
			where: {
				order_id: null,
				user_id,
			},
			include: { product: true },
		});

		if (!cartItems.length) {
			throw new BadRequestException('Your cart is empty');
		}

		let total_amount = 0;

		for (const item of cartItems) {
			if (item.product.quantity < item.quantity) {
				throw new ForbiddenException(
					`Not enough stock for ${item.product.name}`,
				);
			}

			total_amount += item.price_at_purchase * item.quantity;
		}

		await Promise.all(
			cartItems.map((item) =>
				this.prisma.product.update({
					where: { id: item.product_id },
					data: {
						quantity: { decrement: item.quantity },
					},
				}),
			),
		);

		const randomStatus = this.getRandomPaymentStatus();

		const order = await this.prisma.order.create({
			data: {
				user_id,
				total_amount,
				payment_status: payment_status,
				delivery_status: delivery_status ?? DeliveryStatus.PENDING,
			},
		});

		await Promise.all(
			cartItems.map((item) =>
				this.prisma.orderDetail.update({
					where: { order_detail_id: item.order_detail_id },
					data: { order_id: order.order_id },
				}),
			),
		);

		return order;
	}

	private getRandomPaymentStatus(): PaymentStatus {
		const statuses = [
			PaymentStatus.COMPLETE,
			PaymentStatus.FAILED,
			PaymentStatus.PENDING,
		];
		const index = Math.floor(Math.random() * statuses.length);
		return statuses[index];
	}
}
