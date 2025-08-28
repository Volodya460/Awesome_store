import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from 'src/store/auth/auth.store';

export const mainAxios = axios.create({
	baseURL: 'http://192.168.0.127:3000',
	withCredentials: true,
});

mainAxios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const { token } = useAuthStore.getState();

		if (token) {
			config.headers = config.headers ?? {};
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

mainAxios.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (
		error: AxiosError & {
			config?: AxiosRequestConfig & { _retry?: boolean };
		},
	) => {
		const originalRequest = error.config;
		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			const { refreshToken, setToken } = useAuthStore.getState();

			if (!refreshToken) {
				return Promise.reject(error);
			}

			try {
				const resp = await axios.post<{
					access_token: string;
					refresh_token: string;
				}>(`${mainAxios.defaults.baseURL}/auth/refresh`, undefined, {
					headers: { Authorization: `Bearer ${refreshToken}` },
				});

				const { access_token, refresh_token } = resp.data;

				setToken(access_token, refresh_token);

				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${access_token}`;
				}
				return mainAxios.request(originalRequest);
			} catch (refreshErr) {
				return Promise.reject(refreshErr);
			}
		}

		return Promise.reject(error);
	},
);
