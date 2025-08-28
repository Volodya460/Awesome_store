import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { FilterProductDto, ProductState } from './types/product.types';
import { productApi } from './product.api';
import { showToast } from 'src/shared/utils/toast';

export const useProductStore = create<ProductState>()(
	devtools(
		immer((set) => ({
			products: [],
			lastPage: 1,
			isLoading: false,

			fetchProducts: async (filters: FilterProductDto) => {
				set((state) => {
					state.isLoading = true;
				});

				try {
					const data = await productApi.getAll(filters);

					set((state) => {
						if (filters.page === '1') {
							state.products = data.data;
						} else {
							state.products.push(...data.data);
						}

						state.lastPage = data.lastPage;
					});
				} catch (error) {
					showToast('Something vrong', error, 'error');
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},
			getById: async (id: string) => {
				try {
					const product = await productApi.getById(id);
					return product;
				} catch (error) {
					showToast('Something vrong', error, 'error');
					return null;
				}
			},
		})),
	),
);
