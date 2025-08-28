import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { FilterProductDto, Product } from './types/product.types';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';

class ProductApiService {
	private readonly http: EnhancedWithAuthHttpService;

	constructor(httpService: EnhancedWithAuthHttpService) {
		this.http = httpService;
	}

	async getAll(query: FilterProductDto): Promise<{
		data: Product[];
		total: number;
		page: number;
		lastPage: number;
	}> {
		const queryStr = this.http.createQueryLink(
			'product/all',
			query as Record<string, string>,
		);

		return await this.http.get(queryStr);
	}

	async getById(id: string): Promise<Product> {
		return await this.http.get(`product/${id}`);
	}
}

export const productApi = new ProductApiService(
	new EnhancedWithAuthHttpService(
		new HttpFactoryService().createHttpService(),
	),
);
