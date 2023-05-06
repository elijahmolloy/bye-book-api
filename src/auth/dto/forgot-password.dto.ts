import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordDto {
	@IsString()
	@IsEmail()
	@ApiProperty({
		description: 'Email address for new account',
		example: 'testemail@gmail.com'
	})
	email: string;
}
