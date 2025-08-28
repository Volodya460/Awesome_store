import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthState } from './types/store.types';
import { authService } from './auth.api';
import { showToast } from 'src/shared/utils/toast';
import { AxiosError } from 'axios';
import { ResetPasswordDto } from './types/auth.types';

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			immer((set, get) => ({
				token: null,
				refreshToken: null,
				email: null,
				isLoading: false,
				isLoggedIn: false,
				isRegister: false,
				isVerified: false,

				setToken: (accessToken: string, refreshToken: string) => {
					set((state) => {
						state.token = accessToken;
						state.refreshToken = refreshToken;
						state.isLoggedIn = true;
					});
				},
				setIsLoggedIn: () => {
					set((state) => {
						state.isLoggedIn = false;
					});
				},
				setTokens: (accessToken: string, refreshToken: string) => {
					set((state) => {
						state.token = accessToken;
						state.refreshToken = refreshToken;
						state.isLoggedIn = true;
					});
				},

				clearToken: () => {
					set((state) => {
						state.token = null;
						state.isLoggedIn = false;
					});
				},

				login: async (data) => {
					set((state) => {
						state.isLoading = true;
					});
					try {
						const response = await authService.login(data);
						set((state) => {
							state.token = response.access_token;
							state.refreshToken = response.refresh_token;
							state.email = data.email;
							state.isLoggedIn = true;
						});
						showToast(
							'Login successful',
							'Welcome back!',
							'success',
						);
						return 'success';
					} catch (error) {
						const axiosError = error as AxiosError;
						const status = axiosError.response?.status;

						if (status === 422) {
							set((state) => {
								state.email = data.email;
							});
							return 'unverified';
						}
						showToast('Incorect email or password', 'error');
						return 'error';
					} finally {
						set((state) => {
							state.isLoading = false;
						});
					}
				},

				register: async (data) => {
					set((state) => {
						state.isLoading = true;
					});
					try {
						console.log(data);
						await authService.register(data);
						set((state) => {
							state.isRegister = true;
							state.email = data.email;
						});
						showToast(
							'Registration successful',
							'Please check your email',
							'success',
						);
					} catch (error) {
						showToast('Registration failed', error, 'error');
					} finally {
						set((state) => {
							state.isLoading = false;
						});
					}
				},

				verify: async (data) => {
					set((state) => {
						state.isLoading = true;
					});
					try {
						await authService.verify(data);
						set((state) => {
							state.isVerified = true;
						});
						showToast(
							'Email verified',
							'You can now log in.',
							'success',
						);
					} catch (error) {
						showToast('Verification failed', error, 'error');
						throw error;
					} finally {
						set((state) => {
							state.isLoading = false;
						});
					}
				},
				resendVerification: async (email) => {
					set((state) => {
						state.isLoading = true;
						state.isVerified = false;
					});
					try {
						await authService.resendVerification(email);
					} catch (error) {
						showToast(
							'Failed to resend verification',
							error,
							'error',
						);
						throw error;
					} finally {
						set((state) => {
							state.isLoading = false;
						});
					}
				},

				logout: async () => {
					const token = get().token;
					try {
						if (token) await authService.logout(token);
					} catch (e) {
						console.error('Logout failed', e);
					}

					set((state) => {
						state.token = null;
						state.refreshToken = null;
						state.isLoggedIn = false;
						state.email = null;
					});
				},

				reset: () => {
					set((state) => {
						state.token = null;
						state.isLoggedIn = false;
						state.email = null;
						state.isRegister = false;
						state.isVerified = false;
						state.refreshToken = null;
					});
				},

				refreshTokens: async () => {
					const { refreshToken } = get();
					if (!refreshToken) return;

					set((state) => {
						state.isLoading = true;
					});

					try {
						const newTokens = await authService.refresh();
						set((state) => {
							state.token = newTokens.access_token;
							state.refreshToken = newTokens.refresh_token;
							state.isLoggedIn = true;
						});
					} catch (error) {
						console.error(
							'[useAuthStore] refreshTokens Error:',
							error,
						);
					} finally {
						set((state) => {
							state.isLoading = false;
						});
					}
				},

				hydrateAuthState: async () => {
					const { token, refreshToken } = get();

					if (token && refreshToken) {
						set((state) => {
							state.isLoggedIn = true;
						});
					}
				},

				resetPassword: async (dto: ResetPasswordDto) => {
					set({ isLoading: true });
					try {
						const message = await authService.resetPassword(dto);
						showToast(message, 'success');
					} catch (error) {
						showToast('Failed to reset password', 'error');
						throw error;
					} finally {
						set({ isLoading: false });
					}
				},
			})),
			{
				name: 'auth-storage',
				storage: createJSONStorage(() => AsyncStorage),
				partialize: (state) => ({
					token: state.token,
					refreshToken: state.refreshToken,
				}),
			},
		),
	),
);
