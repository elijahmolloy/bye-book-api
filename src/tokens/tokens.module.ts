import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './entities/token.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
		ConfigModule,
		UsersModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET
		})
	],
	providers: [TokensService],
	exports: [TokensService]
})
export class TokensModule {}
