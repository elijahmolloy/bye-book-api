import { Injectable, NotImplementedException } from '@nestjs/common';
import { BooksQueryDto } from './dto/books-query.dto';

@Injectable()
export class BooksService {
	constructor() {}

	async queryBooks(booksQueryDto: BooksQueryDto): Promise<any[]> {
		const searchString = `text=${encodeURI(booksQueryDto.title)}
			&page=${booksQueryDto.page ?? 1}
			&pageSize=${booksQueryDto.pageSize ?? 20}`;

		const booksResponse = await fetch(`https://api2.isbndb.com/search/books?${searchString}`, {
			method: 'GET',
			headers: {
				"Content-Type": 'application/json',
				"Authorization": process.env.ISBNDB_API_KEY
			}
		});

		return await booksResponse.json();
	}
}
