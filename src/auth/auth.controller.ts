import {
	Body,
	Controller,
	NotImplementedException,
	Post
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReAuthDto } from './dto/re-auth.dto';

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
	@ApiResponse({ status: 201, description: 'Account creation successful' })
	@ApiResponse({ status: 400, description: 'Email already taken' })
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
	@ApiResponse({ status: 200, description: 'Login successful' })
	@ApiResponse({ status: 401, description: 'Incorrect email or password' })
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
	@ApiResponse({ status: 204, description: 'Logout successful' })
	async logout(@Body() reAuthDto: ReAuthDto) {
		await this.authServices.logout(reAuthDto);
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
