import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import {
	ChangePasswordDto,
	UpdateUserDto,
	UserProfile,
} from './types/user.types';

class UserApiService {
	private http: EnhancedWithAuthHttpService;

	constructor() {
		this.http = new EnhancedWithAuthHttpService(
			new HttpFactoryService().createHttpService(),
		);
	}

	async getUserInfo(): Promise<UserProfile> {
		return await this.http.get('user/profile');
	}

	async updateUser(dto: UpdateUserDto): Promise<UserProfile> {
		return await this.http.patch('user/update', dto);
	}

	async deleteUser(): Promise<{ message: string }> {
		return await this.http.delete('user/remove');
	}
	async changePassword(dto: ChangePasswordDto): Promise<{ message: string }> {
		return await this.http.patch('user/change-password', dto);
	}
}

export const userApi = new UserApiService();
