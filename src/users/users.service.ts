import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor() {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		throw new NotImplementedException();
	}

	async findAll(): Promise<User[]> {
		throw new NotImplementedException();
	}

	async findOne(id: number): Promise<User> {
		throw new NotImplementedException();
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		throw new NotImplementedException();
	}

	async remove(id: number): Promise<User> {
		throw new NotImplementedException();
	}

	private async isEmailTaken(email: string): Promise<boolean> {
		// const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
		// return !!user;

		throw new NotImplementedException();
	}
}
