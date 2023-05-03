import {
	Inject,
	Injectable,
	NotFoundException,
	NotImplementedException,
	UnauthorizedException,
	forwardRef
} from '@nestjs/common';
import { TokenType } from 'src/tokens/enum/token-type.enum';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ReAuthDto } from './dto/re-auth.dto';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly tokensService: TokensService) {}

	async loginWithEmailAndPassword(loginDto: LoginDto): Promise<User> {
		const user = await this.usersService.findOneByEmail(loginDto.email);
		if (!user || !(await user.isPasswordMatch(loginDto.password))) {
			throw new UnauthorizedException('Incorrect email or password');
		}

		return user;
	}

	async logout(reAuthDto: ReAuthDto) {
		await this.tokensService.deleteOneByTokenAndType(reAuthDto.refreshToken, TokenType.REFRESH);
	}

	async refreshAuth(reAuthDto: ReAuthDto) {
		try {
			const refreshTokenDocument = await this.tokensService.verifyToken(
				reAuthDto.refreshToken,
				TokenType.REFRESH
			);
			const user = await this.usersService.findOne(+refreshTokenDocument.user);
			if (!user) {
				throw new Error();
			}

			await this.tokensService.delete(+refreshTokenDocument.id);
			return this.tokensService.generateAuthTokens(user);
		} catch (error) {
			throw new UnauthorizedException('Please authenticate');
		}
	}

	async resetPassword(resetPasswordToken: string, newPassword: string) {
		//
		throw new NotImplementedException();
	}

	async verifyEmail(verifyEmailToken: string) {
		try {
			const verifyEmailTokenDocument = await this.tokensService.verifyToken(
				verifyEmailToken,
				TokenType.VERIFY_EMAIL
			);
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
