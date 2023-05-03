import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReAuthDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDUyMGQ2N2I2MDEwZDM1NTcxYzc4MGIiLCJpYXQiOjE2ODMwOTg5ODMsImV4cCI6MTY4NTY5MDk4MywidHlwZSI6InJlZnJlc2gifQ.viGxwV3jlC7aLiVxqr2pHqGGi3ULb2UK0VVxbVfvk3Y'
	})
	refreshToken: string;
}
