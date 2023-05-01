import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		TokensModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL),
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: () => {
					const schema = UserSchema;

					// If password has been altered, ensure to hash it
					schema.pre('save', async function () {
						const user = this;

						if (user.isModified('password')) {
							user.password = await bcrypt.hash(
								user.password,
								12
							);
						}
					});

					// Determine if input password matches what a user has saved
					schema.methods.isPasswordMatch = async function (
						password: string
					) {
						const user = this;
						return await bcrypt.compare(password, user.password);
					};

					return schema;
				}
			}
		])
	],
	controllers: [],
	providers: []
})
export class AppModule {}
