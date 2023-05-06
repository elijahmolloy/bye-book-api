import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailModule } from './email/email.module';
import { StripeModule } from './stripe/stripe.module';
import { BooksModule } from './books/books.module';

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
		EmailModule,
		StripeModule,
		BooksModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
