import {
	BadRequestException,
	Inject,
	Injectable,
	NotImplementedException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		if (await this.isEmailTaken(createUserDto.email)) {
			throw new BadRequestException('Email already taken');
		}

		return await this.userModel.create({
			firstName: createUserDto.firstName,
			lastName: createUserDto.lastName,
			email: createUserDto.email,
			password: createUserDto.password,
			role: UserRole.USER,
			isEmailVerified: false
		});
	}

	async findAll(): Promise<User[]> {
		return await this.userModel.find();
	}

	async query(): Promise<any> {
		throw new NotImplementedException();
	}

	async findOne(id: number): Promise<User> {
		return await this.userModel.findById(id);
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email });
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		return await this.userModel.findByIdAndUpdate(id, updateUserDto);
	}

	async remove(id: number): Promise<User> {
		return await this.userModel.findByIdAndDelete(id);
	}

	private async isEmailTaken(email: string): Promise<boolean> {
		const user = await this.findOneByEmail(email);
		return !!user;
	}
}
