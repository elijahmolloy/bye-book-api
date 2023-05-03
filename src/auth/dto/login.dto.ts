import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	constructor(partial: Partial<LoginDto>) {
		Object.assign(this, partial);
	}

	@IsString()
	@IsEmail()
	@ApiProperty({
		example: 'testemail@gmail.com'
	})
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'password!sS3cur3'
	})
	password: string;
}
