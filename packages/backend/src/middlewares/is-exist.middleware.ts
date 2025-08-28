import {
	Injectable,
	NotFoundException,
	BadRequestException,
	NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class IsExistMiddleware implements NestMiddleware {
	constructor(private readonly prisma: PrismaService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const { entity } = req.body;

		if (!id) {
			throw new BadRequestException(
				'Missing entity ID in request params',
			);
		}

		if (!entity) {
			throw new BadRequestException(
				'Missing entity name in request body',
			);
		}

		let record: any;

		switch (entity) {
			case 'user':
				record = await this.prisma.user.findUnique({ where: { id } });
				break;
			case 'product':
				record = await this.prisma.product.findUnique({
					where: { id },
				});
				break;
			default:
				throw new BadRequestException(`Unsupported entity: ${entity}`);
		}

		if (!record) {
			throw new NotFoundException(`${entity} with ID "${id}" not found`);
		}

		next();
	}
}
