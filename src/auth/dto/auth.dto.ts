import { ApiProperty } from '@nestjs/swagger';
import { AuthTokensDto } from 'src/tokens/dto/auth-tokens.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class AuthDto {
	constructor(partial: Partial<AuthDto>) {
		Object.assign(this, partial);
	}

	@ApiProperty({})
	user: UserDto;

	@ApiProperty({})
	tokens: AuthTokensDto;
}
