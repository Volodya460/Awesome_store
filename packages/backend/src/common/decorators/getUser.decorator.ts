import { JwtPayload } from '@/auth/strategies/at.strategy';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const GetUserDecorator = createParamDecorator(
	(_: undefined, context: ExecutionContext): JwtPayload => {
		const request = context.switchToHttp().getRequest<Request>();
		const user = request.user as JwtPayload;

		return user;
	},
);
