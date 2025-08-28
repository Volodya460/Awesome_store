import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterProductDto } from './dto/filter-product.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
	constructor(private prismaService: PrismaService) {}

	async findAll(query: FilterProductDto) {
		const { name, sort = 'asc', page = '1', limit = '10' } = query;

		const take = parseInt(limit);
		const skip = (parseInt(page) - 1) * take;

		const where = name
			? {
					name: {
						contains: name,
						mode: 'insensitive' as 'insensitive',
					},
				}
			: {};

		const [products, total] = await Promise.all([
			this.prismaService.product.findMany({
				where,
				orderBy: {
					price: sort,
				},
				skip,
				take,
			}),
			this.prismaService.product.count({ where }),
		]);

		return {
			data: products,
			total,
			page: parseInt(page),
			lastPage: Math.ceil(total / take),
		};
	}

	async findById(id: string) {
		const product = await this.prismaService.product.findUnique({
			where: { id },
		});
		if (!product) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}
		return product;
	}

	async create(data: CreateProductDto) {
		return this.prismaService.product.create({
			data: {
				...data,
			},
		});
	}

	async update(id: string, data: UpdateProductDto) {
		return this.prismaService.product.update({
			where: { id },
			data,
		});
	}
	async delete(id: string) {
		return this.prismaService.product.delete({
			where: { id },
		});
	}
}
