import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../enum/user-role.enum';
import { Document, HydratedDocument } from 'mongoose';
import { NotImplementedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
	constructor(partial: Partial<User>) {
		super();
		Object.assign(this, partial);
	}

	@Prop({ required: true, trim: true })
	firstName: string;

	@Prop({ required: true, trim: true })
	lastName: string;

	@Prop({
		required: true,
		trim: true,
		unique: true,
		index: true,
		lowercase: true
	})
	email: string;

	@Prop({ required: true, trim: true })
	password: string;

	@Prop({ enum: UserRole, default: UserRole.USER })
	role: UserRole;

	@Prop({ default: false })
	isEmailVerified: boolean;

	async isPasswordMatch(password: string): Promise<boolean> {
		const user = this;
		console.log(`user.password: ${user.password}`);
		console.log(`input password: ${password}`);
		return await bcrypt.compare(password, user.password);
	}
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function(next) {
	const user = this;

	// Hash password if it has changed
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 12);
	}

	// Reset isEmailVerified if email has been updated
	if (user.isModified('email')) {
		user.isEmailVerified = false;
	}

	next();
});
// UserSchema.pre('save', async function(next) {
// 	const user = this;
// 	if (user.isModified('password')) {

// 	}

// 	next();
// });
UserSchema.loadClass(User);
