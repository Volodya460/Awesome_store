import { IsEnum, IsOptional } from 'class-validator';

export enum PaymentStatus {
	COMPLETE = 'COMPLETE',
	FAILED = 'FAILED',
	PENDING = 'PENDING',
}

export enum DeliveryStatus {
	PENDING = 'PENDING',
	IN_TRANSIT = 'IN_TRANSIT',
	DELIVERED = 'DELIVERED',
}

export class CreateOrderItemDto {
	product_id: string;
	quantity: number;
}

export class CreateOrderDto {
	payment_status: PaymentStatus;
	delivery_status?: DeliveryStatus;
}

export class FilterOrderDto {
	@IsOptional()
	@IsEnum(PaymentStatus)
	payment?: PaymentStatus;

	@IsOptional()
	@IsEnum(DeliveryStatus)
	delivery?: DeliveryStatus;

	@IsOptional()
	orderByDate?: 'asc' | 'desc';
}
