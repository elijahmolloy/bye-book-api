import { BadRequestException, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

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

	async findOne(id: string): Promise<User> {
		try {
			return await this.userModel.findById(id);
		} catch (error) {
			throw new NotFoundException('User not found');
		}
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email });
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.findOne(id);

		if (updateUserDto.email && (await this.isEmailTaken(updateUserDto.email, user.id))) {
			throw new BadRequestException('Email already taken');
		}

		// user.save() is used to ensure the pre-save is executed for these changes
		Object.assign(user, updateUserDto);
		return await user.save();
	}

	async remove(id: string): Promise<User> {
		return await this.userModel.findByIdAndDelete(id);
	}

	private async isEmailTaken(email: string, excludeUserId: string = undefined): Promise<boolean> {
		const user = await this.userModel.findOne({ email, _id: { $ne: excludeUserId } });
		return !!user;
	}
}
