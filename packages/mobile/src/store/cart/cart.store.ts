import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { cartApi } from './cart.api';
import {
	CartState,
	CreateOrderDetailDto,
	OrderDetail,
	UpdateOrderDetailDto,
} from './types';
import { showToast } from 'src/shared/utils/toast';

export const useCartStore = create<CartState>()(
	devtools(
		immer((set) => ({
			cart: [] as OrderDetail[],
			isLoading: false,

			getCart: async () => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					const data = await cartApi.getCart();
					set((state) => {
						state.cart = data;
					});
				} catch (error) {
					showToast('Something vrong', error, 'error');
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},

			addToCart: async (dto: CreateOrderDetailDto) => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					await cartApi.addToCart(dto);
				} catch (error) {
					showToast('Something vrong', error, 'error');
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},

			updateCartItem: async (id: string, dto: UpdateOrderDetailDto) => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					const updatedItem = await cartApi.updateCartItem(id, dto);
					set((state) => {
						const index = state.cart.findIndex(
							(item) => item.order_detail_id === id,
						);
						if (index !== -1) {
							state.cart[index] = updatedItem;
						}
					});
					showToast('Successful', 'success');
				} catch (error) {
					showToast('Something vrong', error, 'error');
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},

			removeCartItem: async (id: string) => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					await cartApi.removeCartItem(id);
					set((state) => {
						state.cart = state.cart.filter(
							(item) => item.order_detail_id !== id,
						);
					});
					showToast('Delet successful', 'info');
				} catch (error) {
					showToast('Something vrong', error, 'error');
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},
		})),
	),
);
