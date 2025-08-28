import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsNumber()
	quantity?: number;

	@IsOptional()
	@IsNumber()
	price?: number;

	@IsOptional()
	@IsString()
	category?: string;
}
