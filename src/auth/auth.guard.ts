import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRole } from 'src/users/enum/user-role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException();
		}

		// VERIFY JWT IS VALID
		const payload = await this.jwtService.verifyAsync(token, {
			secret: process.env.JWT_SECRET
		});

		const user = await this.usersService.findOne(payload.sub);
		request.user = user;

		// VERIFY REQUIRED ROLE
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('userRoles', [
			context.getHandler(),
			context.getClass()
		]);

		if (requiredRoles) {
			const hasRequiredRights = requiredRoles.includes(user.role);

			if (!hasRequiredRights && request.params.id !== user.id) {
				throw new ForbiddenException();
			}
		}

		// TODO: Update with OWNER PROPERTY DECORATOR CHECK
		// IF INPUT OWNER PROPERTY

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
