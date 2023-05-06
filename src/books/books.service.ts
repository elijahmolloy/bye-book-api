import { Injectable } from '@nestjs/common';
import { BooksQueryDto } from './dto/books-query.dto';

@Injectable()
export class BooksService {
	constructor() {}

	async queryBooks(booksQueryDto: BooksQueryDto) {}
}
