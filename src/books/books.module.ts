import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [JwtModule, UsersModule],
	controllers: [BooksController],
	providers: [BooksService]
})
export class BooksModule {}
