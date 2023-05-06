import { ApiParam, ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseBooksQueryDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({ default: 1 })
	page: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({ default: 20 })
	pageSize: number;
}

export class BooksQueryDto extends PartialType(BaseBooksQueryDto) {}
