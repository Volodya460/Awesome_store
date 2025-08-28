import { Product } from '../product/types/product.types';

export interface OrderDetail {
	order_detail_id: string;
	order_id: string | null;
	product_id: string;
	user_id: string;
	quantity: number;
	price_at_purchase: number;

	product?: Product;
}

export interface CreateOrderDetailDto {
	product_id: string;
	quantity: number;
}

export interface UpdateOrderDetailDto {
	quantity: number;
}

export interface CartState {
	cart: OrderDetail[];
	isLoading: boolean;
	getCart: () => Promise<void>;
	addToCart: (dto: CreateOrderDetailDto) => Promise<void>;
	updateCartItem: (id: string, dto: UpdateOrderDetailDto) => Promise<void>;
	removeCartItem: (id: string) => Promise<void>;
}
