import {
	IsString,
	IsNotEmpty,
	IsEmail,
	IsStrongPassword
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@IsStrongPassword()
	password: string;
}
