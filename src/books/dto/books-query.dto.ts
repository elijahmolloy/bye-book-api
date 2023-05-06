import { ApiParam, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BooksQueryDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	page: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	pageSize: number;
}
