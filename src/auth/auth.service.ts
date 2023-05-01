import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AuthService {
	async loginWithEmailAndPassword(email: string, password: string) {
		throw new NotImplementedException();
	}

	async logout(refreshToken: string) {
		throw new NotImplementedException();
	}

	async refreshAuth(refreshToken: string) {
		throw new NotImplementedException();
	}

	async resetPassword(resetPasswordToken: string, newPassword: string) {
		throw new NotImplementedException();
	}

	async verifyEmail(verifyEmailToken: string) {
		throw new NotImplementedException();
	}
}
