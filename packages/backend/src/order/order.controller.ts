import { AtGuard } from '@/auth/guards/at.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateOrderDto, FilterOrderDto } from './dto/order.dto';
import { GetUserDecorator } from '@/common/decorators/getUser.decorator';
import { JwtPayload } from '@/auth/strategies/at.strategy';

@Controller('orders')
@UseGuards(AtGuard, RolesGuard)
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Roles('USER')
	@Get()
	getAll(
		@Query() filters: FilterOrderDto,
		@GetUserDecorator() user: JwtPayload,
	) {
		return this.orderService.getOrders(user.sub, filters);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@Roles('USER')
	createOrder(
		@Body() dto: CreateOrderDto,
		@GetUserDecorator() user: JwtPayload,
	) {
		return this.orderService.createOrder(user.sub, dto);
	}
}
