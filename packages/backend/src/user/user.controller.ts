import { AtGuard } from '@/auth/guards/at.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { GetUserDecorator } from '@/common/decorators/getUser.decorator';
import { JwtPayload } from '@/auth/strategies/at.strategy';
import {
	ChangePasswordDto,
	ResetPasswordDto,
	UpdateUserDto,
} from './dto/create-user.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Roles('USER')
	@UseGuards(AtGuard, RolesGuard)
	@Get('profile')
	getCurrentUser(@GetUserDecorator() user: JwtPayload) {
		return this.userService.getProfile(user.sub);
	}

	@Roles('USER')
	@UseGuards(AtGuard, RolesGuard)
	@Patch('update')
	updateUser(
		@GetUserDecorator() user: JwtPayload,
		@Body() dto: UpdateUserDto,
	) {
		return this.userService.updateProfile(user.sub, dto);
	}

	@Roles('USER')
	@UseGuards(AtGuard, RolesGuard)
	@Delete('remove')
	removeAccount(@GetUserDecorator() user: JwtPayload) {
		return this.userService.deleteAccount(user.sub);
	}

	@Roles('USER')
	@UseGuards(AtGuard, RolesGuard)
	@Patch('change-password')
	changePassword(
		@Body() dto: ChangePasswordDto,
		@GetUserDecorator() user: JwtPayload,
	) {
		return this.userService.changePassword(user.sub, dto);
	}

	@Patch('reset-password')
	@HttpCode(HttpStatus.OK)
	@Public()
	resetPassword(@Body() dto: ResetPasswordDto): Promise<string> {
		return this.userService.resetPassword(dto.email, dto.newPassword);
	}
}
