import { PrismaService } from '@/prisma/prisma.service';
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { DeliveryStatus } from '@prisma/client';
import {
	CreateOrderDetailDto,
	UpdateOrderDetailDto,
} from './dto/order-detail.dto';

@Injectable()
export class OrderDetailService {
	constructor(private prisma: PrismaService) {}

	async addToCart(userId: string, dto: CreateOrderDetailDto) {
		const product = await this.prisma.product.findUnique({
			where: { id: dto.product_id },
		});

		if (!product) {
			throw new BadRequestException('Product not found');
		}

		if (product.quantity < dto.quantity) {
			throw new ForbiddenException('Not enough stock available');
		}

		return this.prisma.orderDetail.create({
			data: {
				product_id: product.id,
				quantity: dto.quantity,
				price_at_purchase: product.price,
				user_id: userId,
			},
		});
	}

	async getDetailsByOrderId(orderId: string, userId: string) {
		const order = await this.prisma.order.findUnique({
			where: { order_id: orderId },
		});

		if (!order || order.user_id !== userId) {
			throw new ForbiddenException('Access denied to this order');
		}

		return this.prisma.orderDetail.findMany({
			where: { order_id: orderId },
			include: { product: true },
		});
	}

	async getUserCart(userId: string) {
		return this.prisma.orderDetail.findMany({
			where: {
				order_id: null,
				user_id: userId,
			},
			include: {
				product: true,
			},
		});
	}

	async deleteOrderDetail(id: string, userId: string) {
		const detail = await this.prisma.orderDetail.findUnique({
			where: { order_detail_id: id },
			include: { order: true },
		});

		if (!detail) {
			throw new ForbiddenException('Cannot find this product');
		}

		if (!detail.order) {
			return this.prisma.orderDetail.delete({
				where: { order_detail_id: id },
			});
		}

		if (
			detail.order.delivery_status === DeliveryStatus.IN_TRANSIT ||
			detail.order.delivery_status === DeliveryStatus.DELIVERED
		) {
			throw new ForbiddenException(
				'Cannot modify an order that is already in transit or delivered',
			);
		}

		if (detail.order.payment_status === 'COMPLETE') {
			throw new ForbiddenException('Cannot modify a paid order');
		}

		const deleted = await this.prisma.orderDetail.delete({
			where: { order_detail_id: id },
		});

		const remainingDetails = await this.prisma.orderDetail.findMany({
			where: {
				order_id: detail.order.order_id,
			},
		});

		if (remainingDetails.length === 0) {
			await this.prisma.order.delete({
				where: {
					order_id: detail.order.order_id,
				},
			});
		}

		return deleted;
	}

	async updateOrderDetail(id: string, dto: UpdateOrderDetailDto) {
		const detail = await this.prisma.orderDetail.findUnique({
			where: { order_detail_id: id },
			include: {
				order: true,
				product: true,
			},
		});

		if (!detail) {
			throw new ForbiddenException(
				'We have some problem with this product',
			);
		}

		if (detail.order) {
			if (
				detail.order.delivery_status === 'IN_TRANSIT' ||
				detail.order.delivery_status === 'DELIVERED'
			) {
				throw new ForbiddenException('Cannot modify a delivered order');
			}

			if (detail.order.payment_status === 'COMPLETE') {
				throw new ForbiddenException('Cannot modify a paid order');
			}
		}

		const diff = dto.quantity - detail.quantity;

		if (diff > 0 && detail.product.quantity < diff) {
			throw new ForbiddenException('Not enough stock for this product');
		}

		if (diff !== 0) {
			await this.prisma.product.update({
				where: { id: detail.product_id },
				data: {
					quantity: {
						decrement: diff,
					},
				},
			});
		}

		const updated = await this.prisma.orderDetail.update({
			where: { order_detail_id: id },
			data: { quantity: dto.quantity },
		});

		if (detail.order) {
			const orderDetails = await this.prisma.orderDetail.findMany({
				where: {
					order_id: detail.order.order_id,
				},
			});

			const newTotal = orderDetails.reduce(
				(sum, d) => sum + d.quantity * d.price_at_purchase,
				0,
			);

			await this.prisma.order.update({
				where: { order_id: detail.order.order_id },
				data: {
					total_amount: newTotal,
				},
			});
		}

		return updated;
	}
}
