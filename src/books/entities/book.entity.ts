import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Book extends Document {
	constructor(partial: Partial<Book>) {
		super();
		Object.assign(this, partial);
	}

	@Prop()
	title: string;

	@Prop()
	longTitle: string;

	@Prop()
	isbn: string;

	@Prop()
	isbn13: string;

	@Prop()
	deweyDecimal: string;

	@Prop()
	binding: string;

	@Prop()
	publisher: string;

	@Prop()
	language: string;

	@Prop()
	datePublished: Date;

	@Prop()
	edition: string;

	@Prop()
	pages: number;

	@Prop()
	dimensions: string;

	@Prop()
	overview: string;

	@Prop()
	imageUrl: string;

	@Prop()
	msrp: number;

	@Prop()
	excerpt: string;

	@Prop()
	synopsis: string;

	@Prop()
	authors: string[];

	@Prop()
	subjects: string[];

	@Prop()
	reviews: string[];
}
