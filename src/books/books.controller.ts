import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { BooksService } from './books.service';
import { BooksQueryDto } from './dto/books-query.dto';
import { BookDto } from './dto/book.dto';

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
	async searchBooks(@Body() booksQueryDto: BooksQueryDto): Promise<BookDto[]> {
		const books = await this.booksService.queryBooks(booksQueryDto);

		return books.map(book => new BookDto({ 
			publisher: book.publisher,
			imageUrl: book.image,
			title: book.title,
			edition: book.edition,
			pages: book.pages,
			datePublished: book.date_published,
			authors: book.authors,
			isbn: book.isbn,
			isbn13: book.isbn13
		}));
	}
}
