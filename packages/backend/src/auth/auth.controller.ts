import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
	LoginDto,
	RegisterDto,
	ResendVerifyEmailDto,
	VerifyEmailDto,
} from './dto/auth.dto';
import { JwtPayloadWithRt, Token } from './types/token.types';
import { RtGuard } from './guards/rf.guard';
import { GetUserDecorator } from '@/common/decorators/getUser.decorator';
import { AtGuard } from './guards/at.guard';
import { JwtPayload } from './strategies/at.strategy';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	signup(@Body() dto: RegisterDto): Promise<string> {
		return this.authService.register(dto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	signin(@Body() dto: LoginDto): Promise<Token> {
		return this.authService.login(dto);
	}

	@Post('verify')
	@HttpCode(HttpStatus.OK)
	verifyEmail(@Body() dto: VerifyEmailDto): Promise<string> {
		console.log(dto);
		return this.authService.verifyEmail(dto.verificationCode);
	}

	@Post('resend')
	@HttpCode(HttpStatus.OK)
	resendVerifyCode(@Body() dto: ResendVerifyEmailDto): Promise<string> {
		return this.authService.resendVerifyCode(dto.email);
	}

	@Post('refresh')
	@UseGuards(RtGuard)
	@HttpCode(HttpStatus.OK)
	refreshTokens(@GetUserDecorator() user: JwtPayloadWithRt): Promise<Token> {
		return this.authService.refresh(user.sub, user.refreshToken);
	}

	@Post('logout')
	@UseGuards(AtGuard)
	@HttpCode(HttpStatus.OK)
	logout(@GetUserDecorator() user: JwtPayload): Promise<void> {
		return this.authService.logout(user.sub);
	}
}
