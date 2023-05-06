import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
    constructor(partial: Partial<BookDto>) {
        Object.assign(this, partial);
    }

    @ApiProperty({})
    publisher: string;

    @ApiProperty({})
    imageUrl: string;

    @ApiProperty({})
    title: string;

    @ApiProperty({})
    edition: string;

    @ApiProperty({})
    pages: number;

    @ApiProperty({})
    datePublished: string;

    @ApiProperty({})
    authors: string[];

    @ApiProperty({})
    isbn: string;

    @ApiProperty({})
    isbn13: string;
}