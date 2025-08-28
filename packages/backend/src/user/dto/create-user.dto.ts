import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';
export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	phone: string;

	@IsNotEmpty()
	@IsString()
	shippingAddress: string;

	@IsString()
	verificationCode: string;

	@IsOptional()
	@IsEnum(Role)
	role?: Role;
}

export class UpdateUserDto {
	@IsString()
	username: string;

	@IsString()
	phone: string;

	@IsString()
	shippingAddress: string;
}

export class ChangePasswordDto {
	@IsString()
	currentPassword: string;

	@IsString()
	newPassword: string;
}

export class ResetPasswordDto {
	@IsEmail()
	email: string;

	@IsString()
	newPassword: string;
}
