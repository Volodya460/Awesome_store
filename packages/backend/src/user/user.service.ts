import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ForbiddenException, Injectable } from '@nestjs/common';
import {
	ChangePasswordDto,
	CreateUserDto,
	UpdateUserDto,
} from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async createUser(data: CreateUserDto) {
		return this.prisma.user.create({ data });
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async findByVerify(verificationCode: string) {
		return this.prisma.user.findUnique({ where: { verificationCode } });
	}

	async updateUserVerify(verificationCode: string) {
		return this.prisma.user.update({
			where: { verificationCode },
			data: { verify: true, verificationCode: '' },
		});
	}

	async updateUserVerifyCode(verificationCode: string, email: string) {
		return this.prisma.user.update({
			where: { email },
			data: { verificationCode },
		});
	}

	async getProfile(userId: string) {
		return this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				email: true,
				username: true,
				phone: true,
				shippingAddress: true,
			},
		});
	}
	async updateProfile(userId: string, dto: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id: userId },
			data: {
				username: dto.username,
				phone: dto.phone,
				shippingAddress: dto.shippingAddress,
			},
			select: {
				email: true,
				username: true,
				phone: true,
				shippingAddress: true,
			},
		});
	}

	async deleteAccount(userId: string) {
		await this.prisma.user.delete({
			where: { id: userId },
		});

		return {
			message: 'Your account has been deleted successfully.',
		};
	}

	async changePassword(userId: string, dto: ChangePasswordDto) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});
		if (!user) throw new ForbiddenException('User not found');

		const isMatch = await bcrypt.compare(
			dto.currentPassword,
			user.password,
		);
		if (!isMatch)
			throw new ForbiddenException('Current password is incorrect');

		const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

		await this.prisma.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});

		return { message: 'Password successfully changed' };
	}

	async resetPassword(email: string, newPassword: string): Promise<string> {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new ForbiddenException('User not found');
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await this.prisma.user.update({
			where: { id: user.id },
			data: { password: hashedPassword },
		});

		return 'Password reset successfully';
	}
}
