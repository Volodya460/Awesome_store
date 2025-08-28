import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
const secret = process.env.REFRESH_TOKEN_SECRET;
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secret,
			passReqToCallback: true,
		} as StrategyOptionsWithRequest);
	}

	validate(req: Request, payload: any) {
		const authHeader = req.get('authorization');
		if (!authHeader)
			throw new UnauthorizedException('Missing refresh token');

		const refreshToken = authHeader.replace('Bearer', '').trim();
		return {
			...payload,
			refreshToken,
		};
	}
}
