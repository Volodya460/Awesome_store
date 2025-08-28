import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import {
	CreateOrderDetailDto,
	OrderDetail,
	UpdateOrderDetailDto,
} from './types';

class CartApiService {
	private readonly http: EnhancedWithAuthHttpService;

	constructor(httpService: EnhancedWithAuthHttpService) {
		this.http = httpService;
	}

	async getCart(): Promise<OrderDetail[]> {
		return await this.http.get('order-detail/cart');
	}

	async addToCart(dto: CreateOrderDetailDto): Promise<OrderDetail> {
		return await this.http.post('order-detail', dto);
	}

	async updateCartItem(
		id: string,
		dto: UpdateOrderDetailDto,
	): Promise<OrderDetail> {
		return await this.http.patch(`order-detail/${id}`, dto);
	}

	async removeCartItem(id: string): Promise<void> {
		return await this.http.delete(`order-detail/${id}`);
	}
}

export const cartApi = new CartApiService(
	new EnhancedWithAuthHttpService(
		new HttpFactoryService().createHttpService(),
	),
);
