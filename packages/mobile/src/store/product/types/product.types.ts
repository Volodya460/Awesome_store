export interface Product {
	id: string;
	name: string;
	description?: string;
	quantity: number;
	price: number;
	category: string;
}

export interface ProductResponse {
	data: Product[];
	total: number;
	page: number;
	lastPage: number;
}

export interface FilterProductDto {
	name?: string;
	sort?: 'asc' | 'desc';
	page?: string;
	limit?: string;
}

export interface ProductState {
	products: Product[];
	lastPage: number;
	isLoading: boolean;
	fetchProducts: (query: FilterProductDto) => Promise<void>;
	getById: (id: string) => Promise<Product | null>;
}
