import {
	LoginRequest,
	RegisterRequest,
	ResetPasswordDto,
	VerifyRequest,
} from './auth.types';

export interface AuthState {
	token: string | null;
	refreshToken: string | null;
	email: string | null;
	isLoading: boolean;
	isLoggedIn: boolean;
	isRegister: boolean;
	isVerified: boolean;

	setToken: (token: string, refreshToken: string) => void;
	clearToken: () => void;
	login: (data: LoginRequest) => Promise<'unverified' | 'error' | 'success'>;
	register: (data: RegisterRequest) => Promise<void>;
	verify: (data: VerifyRequest) => Promise<void>;
	resendVerification: (email: string) => Promise<void>;
	logout: () => void;
	reset: () => void;
	refreshTokens: () => Promise<void>;
	hydrateAuthState: () => Promise<void>;
	setIsLoggedIn: () => void;
	resetPassword: (dto: ResetPasswordDto) => void;
}
