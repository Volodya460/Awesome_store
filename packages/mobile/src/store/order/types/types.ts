import { OrderDetail } from 'src/store/cart/types';

export type PaymentStatus = 'COMPLETE' | 'FAILED' | 'PENDING';
export type DeliveryStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';

export interface Order {
	order_id: string;
	user_id: string;
	total_amount: number;
	payment_status: PaymentStatus;
	delivery_status: DeliveryStatus;
	createdAt: string;
	updatedAt: string;
	order_details: OrderDetail[];
}

export interface FilterOrderDto {
	payment?: string;
	delivery?: string;
	orderByDate?: 'asc' | 'desc';
}

export interface CreateOrderDto {
	payment_status?: PaymentStatus;
	delivery_status?: DeliveryStatus;
}

export interface OrderState {
	orders: Order[];
	isLoading: boolean;
	fetchOrders: (filters: FilterOrderDto) => Promise<void>;
	createOrder: (dto: CreateOrderDto) => Promise<void>;
	getOrderDetails: (orderId: string) => Promise<OrderDetail[]>;
	createPayment: (dto: CreatePaymentDto) => Promise<PaymentResponse>;
}
export interface CreatePaymentDto {
	order_id: string;
}

export interface PaymentResponse {
	payment_status: string;
	message: string;
}
