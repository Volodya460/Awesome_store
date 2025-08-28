import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import {
	CreateOrderDto,
	CreatePaymentDto,
	FilterOrderDto,
	Order,
	PaymentResponse,
} from './types/types';
import { OrderDetail } from '../cart/types';

class OrderApiService {
	private readonly http: EnhancedWithAuthHttpService;

	constructor(httpService: EnhancedWithAuthHttpService) {
		this.http = httpService;
	}

	async getAll(filters: FilterOrderDto): Promise<Order[]> {
		const queryStr = this.http.createQueryLink(
			'orders',
			filters as Record<string, string>,
		);

		return await this.http.get(queryStr);
	}

	async createOrder(dto: CreateOrderDto): Promise<Order> {
		return await this.http.post('orders', dto);
	}

	async getDetailsByOrderId(orderId: string): Promise<OrderDetail[]> {
		return await this.http.get(`order-detail/order/${orderId}`);
	}

	async createPayment(dto: CreatePaymentDto): Promise<PaymentResponse> {
		return await this.http.post('payments', dto);
	}
}

export const orderApi = new OrderApiService(
	new EnhancedWithAuthHttpService(
		new HttpFactoryService().createHttpService(),
	),
);
