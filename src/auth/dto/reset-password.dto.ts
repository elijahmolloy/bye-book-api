import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {

	@IsString()
	@IsStrongPassword()
	@ApiProperty({
		description: 'Lowercase + Uppercase characters, Number, Symbol, and at least 8 characters',
		example: 'password!sS3cur3'
	})
    password: string;
}