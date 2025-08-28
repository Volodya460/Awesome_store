export interface UserState {
	user?: UserProfile;

	isLoading: boolean;

	getUserInfo: () => Promise<void>;

	updateUser: (dto: UpdateUserDto) => Promise<UserProfile>;

	deleteUser: () => Promise<void>;

	logout: () => void;
	changePassword: (dto: ChangePasswordDto) => Promise<{ message: string }>;
}

export interface UserProfile {
	email: string;
	username: string;
	phone: string;
	shippingAddress: string;
}

export interface UpdateUserDto {
	username?: string;
	phone?: string;
	shippingAddress?: string;
}
export interface ChangePasswordDto {
	currentPassword: string;
	newPassword: string;
}
