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
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReAuthDto } from './dto/re-auth.dto';
import { AuthTokensDto } from 'src/tokens/dto/auth-tokens.dto';

@ApiTags('Auth')
@Controller({
	path: 'auth',
	version: '1'
})
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokensService: TokensService,
		private readonly authServices: AuthService
	) {}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto): Promise<AuthDto> {
		const user = await this.usersService.create(createUserDto);
		const tokens = await this.tokensService.generateAuthTokens(user);

		return new AuthDto({
			user: new UserDto({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isEmailVerified: user.isEmailVerified
			}),
			tokens
		});
	}

	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<AuthDto> {
		const user = await this.authServices.loginWithEmailAndPassword(
			loginDto
		);
		const tokens = await this.tokensService.generateAuthTokens(user);

		return new AuthDto({
			user: new UserDto({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isEmailVerified: user.isEmailVerified
			}),
			tokens
		});
	}

	@Post('logout')
	async logout(@Body() reAuthDto: ReAuthDto) {
		await this.authServices.logout(reAuthDto);
	}

	@Post('refresh-tokens')
	async refreshTokens(@Body() reAuthDto: ReAuthDto): Promise<AuthTokensDto> {
		return await this.authServices.refreshAuth(reAuthDto);
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
