import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokensModule } from 'src/tokens/tokens.module';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [TokensModule, UsersModule, JwtModule.register({
		secret: process.env.JWT_SECRET,
		signOptions: { expiresIn: '30m' }
	})],
	providers: [AuthService, AuthGuard],
	controllers: [AuthController],
	exports: []
})
export class AuthModule {}
