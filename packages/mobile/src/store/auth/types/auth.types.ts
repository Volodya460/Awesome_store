export interface RegisterRequest {
	email: string;
	username: string;
	phone?: string;
	shippingAddress?: string;
	password: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
}

export interface VerifyRequest {
	verificationCode: string;
}
export interface ResetPasswordDto {
	email: string;
	newPassword: string;
}
