import {
	Controller,
	Post,
	Body,
	UseGuards,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { JwtPayload } from '@/auth/strategies/at.strategy';
import { GetUserDecorator } from '@/common/decorators/getUser.decorator';
import { AtGuard } from '@/auth/guards/at.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

@Controller('payments')
@UseGuards(AtGuard, RolesGuard)
@Roles('USER')
export class PaymentController {
	constructor(private readonly service: PaymentService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(
		@Body() dto: CreatePaymentDto,
		@GetUserDecorator() user: JwtPayload,
	) {
		return this.service.createPayment(dto, user.sub);
	}
}
