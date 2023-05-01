import {
	Body,
	Controller,
	NotImplementedException,
	Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller({
	path: 'auth',
	version: '1'
})
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokensService: TokensService
	) {}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto): Promise<AuthDto> {
		const user = await this.usersService.create(createUserDto);
		const tokens = await this.tokensService.generateAuthTokens(user);

		return new AuthDto();
	}

	@Post('login')
	async login(): Promise<any> {
		throw new NotImplementedException();
	}

	@Post('logout')
	async logout(): Promise<any> {
		throw new NotImplementedException();
	}

	@Post('refresh-tokens')
	async refreshTokens(): Promise<any> {
		throw new NotImplementedException();
	}

	@Post('forgot-password')
	async forgotPassword(): Promise<any> {
		throw new NotImplementedException();
	}

	@Post('reset-password')
	async resetPassword(): Promise<any> {
		throw new NotImplementedException();
	}

	@Post('send-verification-email')
	async sendVerificationEmail(): Promise<any> {
		throw new NotImplementedException();
	}

	@Post('verify-email')
	async verifyEmail(): Promise<any> {
		throw new NotImplementedException();
	}
}
