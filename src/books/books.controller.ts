import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { BooksService } from './books.service';
import { BooksQueryDto } from './dto/books-query.dto';

@ApiTags('Books')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({
	path: 'books',
	version: '1'
})
export class BooksController {
	constructor(private readonly booksService: BooksService) {}

	@HttpCode(200)
	@Post('search')
	async searchBooks(@Body() booksQueryDto: BooksQueryDto) {
		console.log(`page: ${booksQueryDto.page}`);
		console.log(`pageSize: ${booksQueryDto.pageSize}`);
	}
}
