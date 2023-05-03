import { Injectable, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { TokenType } from 'src/tokens/enum/token-type.enum';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

	constructor(private readonly usersService: UsersService, private readonly tokensService: TokensService) {}

	async loginWithEmailAndPassword(authDto: LoginDto): Promise<User> {
		const user = await this.usersService.findOneByEmail(authDto.email);
		if (!user || !(await user.isPasswordMatch(authDto.password))) {
			throw new UnauthorizedException('Incorrect email or password')
		}

		return user;
	}

	async logout(refreshToken: string) {
		const refreshTokenDocument = await this.tokensService.findOneByTokenAndType(refreshToken, TokenType.REFRESH);
		if (!refreshTokenDocument) {
			throw new NotFoundException();
		}

	}

	async refreshAuth(refreshToken: string) {
		throw new NotImplementedException();
	}

	async resetPassword(resetPasswordToken: string, newPassword: string) {
		// 
		throw new NotImplementedException();
	}

	async verifyEmail(verifyEmailToken: string) {
		try {
			const verifyEmailTokenDocument = await this.tokensService.verifyToken(verifyEmailToken, TokenType.VERIFY_EMAIL);
			const user = await this.usersService.findOne(+verifyEmailTokenDocument.id);
			if (!user) {
				throw new Error('User not found');
			}

			await this.tokensService.deleteManyByIdAndType(user.id, TokenType.VERIFY_EMAIL);

			user.isEmailVerified = true;
			await user.save();

		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
