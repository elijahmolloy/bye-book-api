import { Body, Controller, HttpCode, NotImplementedException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReAuthDto } from './dto/re-auth.dto';
import { AuthTokensDto } from 'src/tokens/dto/auth-tokens.dto';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

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
				id: user.id,
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
		const user = await this.authServices.loginWithEmailAndPassword(loginDto);
		const tokens = await this.tokensService.generateAuthTokens(user);

		return new AuthDto({
			user: new UserDto({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isEmailVerified: user.isEmailVerified
			}),
			tokens
		});
	}

	@HttpCode(204)
	@Post('logout')
	async logout(@Body() reAuthDto: ReAuthDto) {
		await this.authServices.logout(reAuthDto);
	}

	@Post('refresh-tokens')
	async refreshTokens(@Body() reAuthDto: ReAuthDto): Promise<AuthTokensDto> {
		return await this.authServices.refreshAuth(reAuthDto);
	}

	@HttpCode(204)
	@Post('forgot-password')
	async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
		const resetPasswordToken = await this.tokensService.generateResetPasswordToken(forgotPasswordDto.email);
		// email service should send password reset email here
	}

	@HttpCode(204)
	@Post('reset-password')
	async resetPassword(@Query('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
		await this.authServices.resetPassword(token, resetPasswordDto.password);
	}

	@HttpCode(204)
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Post('send-verification-email')
	async sendVerificationEmail(@UserDecorator() user: User) {
		const verifyEmailToken = await this.tokensService.generateVerifyEmailToken(user);
		// emailService should send verification email here
	}

	@HttpCode(204)
	@Post('verify-email')
	async verifyEmail(@Query('token') token: string) {
		await this.authServices.verifyEmail(token);
	}
}
