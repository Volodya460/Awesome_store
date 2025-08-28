import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
	ChangePasswordDto,
	UpdateUserDto,
	UserState,
} from './types/user.types';
import { userApi } from './user.api';
import { showToast } from 'src/shared/utils/toast';

export const useUserStore = create<UserState>()(
	devtools((set) => ({
		user: undefined,
		isLoading: false,

		getUserInfo: async () => {
			set({ isLoading: true });
			try {
				const user = await userApi.getUserInfo();
				set({ user });
			} catch (error) {
				console.error('[useUserStore] getUserInfo Error:', error);
			} finally {
				set({ isLoading: false });
			}
		},

		updateUser: async (dto: UpdateUserDto) => {
			set({ isLoading: true });
			try {
				const updatedUser = await userApi.updateUser(dto);
				set({ user: updatedUser });
				showToast('Profile updated successfully', 'success');
			} catch (error) {
				showToast('Error updating profile', 'error');
				throw error;
			} finally {
				set({ isLoading: false });
			}
		},

		deleteUser: async () => {
			set({ isLoading: true });
			try {
				await userApi.deleteUser();
				set({ user: undefined });
				showToast('Account deleted successfully', 'success');
			} catch (error) {
				showToast('Error deleting account', 'error');
				throw error;
			} finally {
				set({ isLoading: false });
			}
		},
		changePassword: async (dto: ChangePasswordDto) => {
			set({ isLoading: true });
			try {
				const response = await userApi.changePassword(dto);
				showToast(response.message, 'success');
				return response;
			} catch (error) {
				showToast('Error changing password', 'error');
				throw error;
			} finally {
				set({ isLoading: false });
			}
		},
	})),
);
