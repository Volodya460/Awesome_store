import {
	Controller,
	Get,
	Query,
	UseGuards,
	Param,
	Post,
	Patch,
	Body,
	Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { RolesGuard } from '@/common/guards/roles.guard';
import { FilterProductDto } from './dto/filter-product.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AtGuard } from '@/auth/guards/at.guard';

@Controller('product')
@UseGuards(AtGuard, RolesGuard)
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('all')
	async getAllProducts(@Query() query: FilterProductDto) {
		return this.productService.findAll(query);
	}
	@Get(':id')
	getOne(@Param('id') id: string) {
		return this.productService.findById(id);
	}

	@Post()
	@Roles('ADMIN')
	create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Patch(':id')
	@Roles('ADMIN')
	update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return this.productService.update(id, dto);
	}

	@Delete(':id')
	@Roles('ADMIN')
	delete(@Param('id') id: string) {
		return this.productService.delete(id);
	}
}
