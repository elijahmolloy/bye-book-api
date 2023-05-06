import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule, StripeModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
