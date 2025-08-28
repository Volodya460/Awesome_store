import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { AtStrategy } from './strategies/at.strategy';
import { EmailModule } from '@/email-sender/email-sender.module';
import { UserModule } from '@/user/user.module';
import { RtStrategy } from './strategies/rf.strategy';

@Module({
	imports: [PrismaModule, JwtModule.register({}), EmailModule, UserModule],
	providers: [AuthService, AtStrategy, RtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
