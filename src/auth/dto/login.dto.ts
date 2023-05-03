import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    constructor(partial: Partial<LoginDto>) {
        Object.assign(this, partial);
    }

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}