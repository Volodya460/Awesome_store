import { PrismaService } from '@/prisma/prisma.service';
import { randomInt } from 'crypto';
import * as bcrypt from 'bcryptjs';
import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './types/token.types';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { EmailService } from '@/email-sender/email-sender.service';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private emailService: EmailService,
		private userService: UserService,
	) {}
	async register(dt: RegisterDto): Promise<string> {
		const {
			username,
			password,
			email,
			phone,
			shippingAddress,
			role = 'USER',
		} = dt;
		const hashPassword: string = await bcrypt.hash(password, 10);

		const verificationCode = this.generateVerificationCode();

		const newUser = await this.userService.createUser({
			username,
			email,
			password: hashPassword,
			phone,
			shippingAddress,
			verificationCode,
			role,
		});
		if (!newUser) {
			throw new ForbiddenException('User registration failed');
		}

		const verifyEmail = {
			to: email,
			subject: 'Email Verification Code',
			html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
		};

		await this.emailService.sendMail(verifyEmail);

		return 'You are successfully registered. Please check your email to verify your account';
	}

	async login(dto: LoginDto): Promise<Token> {
		const user = await this.userService.findByEmail(dto.email);

		if (!user) {
			throw new ForbiddenException('User not found!');
		}
		if (!user.verify) {
			throw new HttpException(
				'Email not verified',
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}

		const isPasswordMatch = await bcrypt.compare(
			dto.password,
			user.password,
		);

		if (!isPasswordMatch) {
			throw new ForbiddenException('Wrong password');
		}

		const tokens = await this.getTokens(user.id, user.email, user.role);
		await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

		return tokens;
	}

	async verifyEmail(verificationCode: string) {
		const user = await this.userService.findByVerify(verificationCode);

		if (!user) {
			throw new ForbiddenException('Invalid verification code');
		}

		if (user?.verificationCode !== verificationCode) {
			throw new ForbiddenException('Invalid verification code');
		}

		await this.userService.updateUserVerify(verificationCode);

		return 'Email verified successfully';
	}
	async getTokens(
		userId: string,
		email: string,
		role: string,
	): Promise<Token> {
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(
				{ sub: userId, email, role },
				{ secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '5m' },
			),
			this.jwtService.signAsync(
				{ sub: userId, email, role },
				{ secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' },
			),
		]);

		return {
			access_token: at,
			refresh_token: rt,
		};
	}

	async updateRefreshTokenHash(userId: string, rt: string) {
		const hashedRt = await bcrypt.hash(rt, 10);
		await this.prisma.user.update({
			where: { id: userId },
			data: { hashed_rt: hashedRt },
		});
	}

	async resendVerifyCode(email: string) {
		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new ForbiddenException('User not found!');
		}

		const verificationCode = this.generateVerificationCode();

		await this.userService.updateUserVerifyCode(verificationCode, email);

		const verifyEmail = {
			to: email,
			subject: 'Email Verification Code',
			html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
		};

		await this.emailService.sendMail(verifyEmail);

		return 'Please check your email to verify your account';
	}

	async refresh(userId: string, rt: string): Promise<Token> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user || !user.hashed_rt)
			throw new ForbiddenException('Access denied');

		const rtMatches = await bcrypt.compare(rt, user.hashed_rt);
		if (!rtMatches) throw new ForbiddenException('Access denied');

		const tokens = await this.getTokens(user.id, user.email, user.role);
		await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

		return tokens;
	}

	async logout(userId: string) {
		await this.prisma.user.update({
			where: { id: userId },
			data: { hashed_rt: null },
		});
	}
	private generateVerificationCode(): string {
		return randomInt(1000, 10000).toString();
	}
}
