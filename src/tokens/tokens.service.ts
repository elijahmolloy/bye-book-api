import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TokenDto } from './dto/auth-token.dto';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { Token } from './entities/token.entity';
import { TokenType } from './enum/token-type.enum';

@Injectable()
export class TokensService {
	private readonly jwtSecret: string;
	private readonly accessExpirationMinutes: number;
	private readonly refreshExpirationDays: number;
	private readonly resetPasswordExpirationMinutes: number;
	private readonly verifyEmailExpirationMinutes: number;

	constructor(
		configService: ConfigService,
		@InjectModel(Token.name) private readonly tokenModel: Model<Token>,
		private readonly usersService: UsersService
	) {
		this.jwtSecret = configService.get<string>('JWT_SECRET');
		this.accessExpirationMinutes = configService.get<number>(
			'JWT_ACCESS_EXPIRATION_MINUTES'
		);
		this.refreshExpirationDays = configService.get<number>(
			'JWT_REFRESH_EXPIRATION_DAYS'
		);
		this.resetPasswordExpirationMinutes = configService.get<number>(
			'JWT_RESET_PASSWORD_EXPIRATION_MINUTES'
		);
		this.verifyEmailExpirationMinutes = configService.get<number>(
			'JWT_VERIFY_EMAIL_EXPIRATION_MINUTES'
		);
	}

	generateToken(userId: string, expires: moment.Moment, type: TokenType, secret = this.jwtSecret): string {
		const payload = {
			sub: userId,
			iat: moment().unix(),
			exp: expires.unix(),
			type
		};

		return jwt.sign(payload, secret);
	}

	async saveToken(token: string, userId: string, expires: moment.Moment, type: TokenType, blacklisted: boolean = false): Promise<Token> {
		return await this.tokenModel.create({
			token, 
			user: userId,
			expires: expires.toDate(),
			type,
			blacklisted
		});
	}

	async verifyToken(token: string, type: TokenType): Promise<Token> {
		const payload = jwt.verify(token, this.jwtSecret);
		const tokenDocument = await this.tokenModel.findOne({ token, type, user: payload.sub, blacklisted: false });

		if (!tokenDocument) {
			throw new NotFoundException('Token not found');
		}

		return tokenDocument;
	}

	async generateAuthTokens(user: User): Promise<AuthTokensDto> {
		const accessTokenExpires = moment().add(this.accessExpirationMinutes, 'minutes');
		const accessToken = this.generateToken(user.id, accessTokenExpires, TokenType.ACCESS);

		const refreshTokenExpires = moment().add(this.refreshExpirationDays, 'days');
		const refreshToken = this.generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);
		await this.saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);

		return new AuthTokensDto({
			access: new TokenDto({
				token: accessToken,
				expires: accessTokenExpires.toDate()
			}),
			refresh: new TokenDto({
				token: refreshToken,
				expires: refreshTokenExpires.toDate()
			})
		});
	}

	async generateResetPasswordToken(email: string) {
		const user = await this.usersService.findOneByEmail(email);
		if (!user) {
			throw new BadRequestException('No users found with this email');
		}

		const expires = moment().add(this.resetPasswordExpirationMinutes, 'minutes');
		const resetPasswordToken = this.generateToken(user.id, expires, TokenType.RESET_PASSWORD);
		
		return await this.saveToken(resetPasswordToken, user.id, expires, TokenType.RESET_PASSWORD);
	}

	async generateVerifyEmailToken(user: User) {
		const expires = moment().add(this.verifyEmailExpirationMinutes, 'minutes');
		const verifyEmailToken = this.generateToken(user.id, expires, TokenType.VERIFY_EMAIL);

		return await this.saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL);
	}

	async findOneByTokenAndType(token: string, type: TokenType): Promise<Token> {
		return await this.tokenModel.findOne({ token, type });
	}

	async deleteManyByIdAndType(userId: string, type: TokenType.VERIFY_EMAIL) {
		return await this.tokenModel.deleteMany({ user: userId, type });
	}
}
