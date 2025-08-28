import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { orderApi } from './order.api';
import {
	CreateOrderDto,
	CreatePaymentDto,
	FilterOrderDto,
	Order,
	OrderState,
} from './types/types';
import { showToast } from 'src/shared/utils/toast';
import { AxiosError } from 'axios';

export const useOrderStore = create<OrderState>()(
	devtools(
		immer((set) => ({
			orders: [] as Order[],
			isLoading: false,

			fetchOrders: async (filters: FilterOrderDto) => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					const orders = await orderApi.getAll(filters);
					set((state) => {
						state.orders = orders;
					});
				} catch (error) {
					showToast('Something vrong', error, 'error');
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},

			createOrder: async (dto: CreateOrderDto) => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					const newOrder = await orderApi.createOrder(dto);
					set((state) => {
						state.orders.push(newOrder);
					});
				} catch (error) {
					showToast('Something vrong', error, 'error');
					throw error;
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},
			getOrderDetails: async (orderId: string) => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					const details = await orderApi.getDetailsByOrderId(orderId);
					return details;
				} catch (error) {
					showToast('Something vrong', error, 'error');
					throw error;
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},
			createPayment: async (dto: CreatePaymentDto) => {
				set((state) => {
					state.isLoading = true;
				});
				try {
					const paymentResponse = await orderApi.createPayment(dto);
					showToast(
						paymentResponse.message,
						paymentResponse.payment_status === 'SUCCESS'
							? 'success'
							: 'error',
					);
					return paymentResponse;
				} catch (error) {
					const axiosError = error as AxiosError;
					const status = axiosError.response?.status;

					if (status === 409) {
						showToast('Order has already been paid', 'info');
						throw error;
					}
					showToast('Payment error', error, 'error');
					throw error;
				} finally {
					set((state) => {
						state.isLoading = false;
					});
				}
			},
		})),
	),
);
