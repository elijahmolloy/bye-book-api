import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpCode, NotImplementedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole, UserRoles } from './enum/user-role.enum';
import { UserDto } from './dto/user.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { UserDecorator } from 'src/auth/decorator/user.decorator';
import { User } from './entities/user.entity';
// import { Stripe } from 'stripe';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({
	path: 'users',
	version: '1'
})
export class UsersController {
	constructor(private readonly usersService: UsersService, private readonly stripeService: StripeService) {}

	@Post()
	@UserRoles(UserRole.ADMIN)
	async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
		const user = await this.usersService.create(createUserDto);

		return new UserDto({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isEmailVerified: user.isEmailVerified
		});
	}

	@Get()
	@UserRoles(UserRole.ADMIN)
	async findAll(): Promise<UserDto[]> {
		const users = await this.usersService.findAll();

		return users.map(
			(user) =>
				new UserDto({
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					isEmailVerified: user.isEmailVerified
				})
		);
	}

	@Get(':id')
	@UserRoles(UserRole.ADMIN)
	async findOne(@Param('id') id: string): Promise<UserDto> {
		const user = await this.usersService.findOne(id);

		return new UserDto({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isEmailVerified: user.isEmailVerified
		});
	}

	@Patch(':id')
	@UserRoles(UserRole.ADMIN)
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
		const user = await this.usersService.update(id, updateUserDto);

		return new UserDto({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isEmailVerified: user.isEmailVerified
		});
	}

	@HttpCode(204)
	@Delete(':id')
	@UserRoles(UserRole.ADMIN)
	async remove(@Param('id') id: string) {
		const user = await this.usersService.remove(id);

		return new UserDto({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isEmailVerified: user.isEmailVerified
		});
	}

	@UserRoles(UserRole.ADMIN)
	@Post(':id/connect-account')
	async createConnectAccount(@Param('id') id: string, @UserDecorator() user: User) {
		throw new NotImplementedException();

		// const connectAccount = await this.stripeService.createConnectAccount(user);
	}

	@UserRoles(UserRole.ADMIN)
	@Delete(':id/connect-account')
	async deleteConnectAccount(@Param('id') id: string, @UserDecorator() user: User) {
		return await this.stripeService.deleteConnectAccount(user);
	}
}
