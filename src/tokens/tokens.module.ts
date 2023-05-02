import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './entities/token.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
		ConfigModule
	],
	providers: [TokensService],
	exports: [TokensService]
})
export class TokensModule {}
