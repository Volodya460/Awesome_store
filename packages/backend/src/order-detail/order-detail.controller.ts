import { AtGuard } from '@/auth/guards/at.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { GetUserDecorator } from '@/common/decorators/getUser.decorator';
import { JwtPayload } from '@/auth/strategies/at.strategy';
import {
	CreateOrderDetailDto,
	UpdateOrderDetailDto,
} from './dto/order-detail.dto';

@Controller('order-detail')
@UseGuards(AtGuard, RolesGuard)
export class OrderDetailController {
	constructor(private readonly service: OrderDetailService) {}

	@Roles('USER')
	@Get('cart')
	getCart(@GetUserDecorator() user: JwtPayload) {
		return this.service.getUserCart(user.sub);
	}

	@Roles('USER')
	@Get('/order/:orderId')
	getDetailsByOrder(
		@Param('orderId') orderId: string,
		@GetUserDecorator() user: JwtPayload,
	) {
		return this.service.getDetailsByOrderId(orderId, user.sub);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	addToCart(
		@Body() dto: CreateOrderDetailDto,
		@GetUserDecorator() user: JwtPayload,
	) {
		return this.service.addToCart(user.sub, dto);
	}

	@Roles('USER')
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateOrderDetailDto) {
		return this.service.updateOrderDetail(id, dto);
	}

	@Roles('USER')
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('id') id: string, @GetUserDecorator() user: JwtPayload) {
		return this.service.deleteOrderDetail(id, user.sub);
	}
}
