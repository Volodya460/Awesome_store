import { HttpService } from 'src/shared/services/http.service';
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	ResetPasswordDto,
	VerifyRequest,
} from './types/auth.types';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';

export class AuthService {
	private readonly http: HttpService;

	constructor(httpService: HttpService) {
		this.http = httpService;
	}

	async login(data: LoginRequest): Promise<LoginResponse> {
		try {
			return await this.http.post<LoginResponse, LoginRequest>(
				'auth/login',
				data,
			);
		} catch (error) {
			throw error;
		}
	}

	async register(data: RegisterRequest): Promise<void> {
		try {
			await this.http.post<void, RegisterRequest>('auth/register', data);
		} catch (error) {
			throw error;
		}
	}

	async verify(data: VerifyRequest): Promise<void> {
		const { verificationCode } = data;
		try {
			await this.http.post<void, { verificationCode: string }>(
				'auth/verify',
				{
					verificationCode,
				},
			);
		} catch (error) {
			throw error;
		}
	}
	async resendVerification(email: string): Promise<void> {
		try {
			await this.http.post<void, { email: string }>('auth/resend', {
				email,
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async refresh(): Promise<{ access_token: string; refresh_token: string }> {
		return this.http.post<
			{ access_token: string; refresh_token: string },
			undefined
		>('auth/refresh', undefined);
	}

	async resetPassword(dto: ResetPasswordDto): Promise<string> {
		return this.http.patch<string, ResetPasswordDto>(
			'user/reset-password',
			dto,
		);
	}

	logout(token: string): Promise<void> {
		return this.http.post('auth/logout', undefined, {
			headers: { Authorization: `Bearer ${token}` },
		});
	}
}

export const authService = new AuthService(
	new HttpFactoryService().createHttpService(),
);
