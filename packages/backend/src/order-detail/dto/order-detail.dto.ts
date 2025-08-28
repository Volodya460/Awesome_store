import { IsInt, Min, IsUUID } from 'class-validator';
export class UpdateOrderDetailDto {
	@IsInt()
	@Min(1)
	quantity: number;
}

export class CreateOrderDetailDto {
	@IsUUID()
	product_id: string;

	@IsInt()
	@Min(1)
	quantity: number;
}
