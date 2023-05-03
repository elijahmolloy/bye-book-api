import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { IsbndbModule } from './isbndb/isbndb.module';
import { EmailModule } from './email/email.module';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		TokensModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'client')
		}),
		IsbndbModule,
		EmailModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
