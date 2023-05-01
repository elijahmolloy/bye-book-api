import { Injectable, NotImplementedException } from '@nestjs/common';
import { TokenType } from './enum/token-type.enum';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Token } from './entities/token.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TokensService {

    private readonly jwtSecret: string;
    private readonly accessExpirationMinutes: number;
    private readonly refreshExpirationDays: number;
    private readonly resetPasswordExpirationMinutes: number;
    private readonly verifyEmailExpirationMinutes: number;

	constructor(
		configService: ConfigService,
		@InjectModel(Token.name) private readonly tokenModel: Model<Token>
	) {
        this.jwtSecret = configService.get<string>('JWT_SECRET');
        this.accessExpirationMinutes = configService.get<number>('JWT_ACCESS_EXPIRATION_MINUTES');
        this.refreshExpirationDays = configService.get<number>('JWT_REFRESH_EXPIRATION_DAYS');
        this.resetPasswordExpirationMinutes = configService.get<number>('JWT_RESET_PASSWORD_EXPIRATION_MINUTES');
        this.verifyEmailExpirationMinutes = configService.get<number>('JWT_VERIFY_EMAIL_EXPIRATION_MINUTES');
    }

	async generateToken() {
		throw new NotImplementedException();
	}

	async saveToken() {
		throw new NotImplementedException();
	}

	async verifyToken(token: string, type: TokenType) {
		throw new NotImplementedException();
	}

	async generateAuthTokens(user: User) {
		throw new NotImplementedException();
	}

	async generateResetPasswordToken(email: string) {
		throw new NotImplementedException();
	}

	async generateVerifyEmailToken(user: User) {
		throw new NotImplementedException();
	}
}
