import { Injectable, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { TokenType } from 'src/tokens/enum/token-type.enum';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

	constructor(private readonly usersService: UsersService, private readonly tokensService: TokensService) {}

	async loginWithEmailAndPassword(email: string, password: string): Promise<User> {
		const user = await this.usersService.findOneByEmail(email);
		if (!user || !(await user.isPasswordMatch(password))) {
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
		throw new NotImplementedException();
	}

	async verifyEmail(verifyEmailToken: string) {
		try {
			const verifyEmailTokenDocument = await this.tokensService.verifyToken(verifyEmailToken, TokenType.VERIFY_EMAIL);
			const user = await this.usersService.findOne(+verifyEmailTokenDocument.id);
			if (!user) {
				throw new Error();
			}

			await this.tokensService.deleteMany(user.id, TokenType.VERIFY_EMAIL);
			await this.usersService.update(+user.id, )
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
