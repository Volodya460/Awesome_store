import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsOptional,
	IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
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

	@IsOptional()
	@IsEnum(Role)
	role?: Role;
}

export class LoginDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}

export class VerifyEmailDto {
	verificationCode: string;
}

export class ResendVerifyEmailDto {
	@IsEmail()
	email: string;
}
