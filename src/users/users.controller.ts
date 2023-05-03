import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole, UserRoles } from './enum/user-role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({
	path: 'users',
	version: '1'
})
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@UserRoles(UserRole.ADMIN)
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@UserRoles(UserRole.ADMIN)
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	@UserRoles(UserRole.ADMIN)
	findOne(@Request() req, @Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	@UserRoles(UserRole.ADMIN)
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@UserRoles(UserRole.ADMIN)
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
