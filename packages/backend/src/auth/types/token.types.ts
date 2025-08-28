import { JwtPayload } from '../strategies/at.strategy';

export type Token = {
	access_token: string;
	refresh_token: string;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
