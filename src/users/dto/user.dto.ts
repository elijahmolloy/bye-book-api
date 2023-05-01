export class UserDto {
	constructor(partial: Partial<UserDto>) {
		Object.assign(this, partial);
	}

	firstName: string;

	lastName: string;

	email: string;

	isEmailVerified: boolean;
}
