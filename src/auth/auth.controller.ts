import { Controller, NotImplementedException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('register')
    async register(): Promise<any> {
        throw new NotImplementedException();
    }

    @Post('login')
    async login(): Promise<any> {
        throw new NotImplementedException();
    }

    @Post('logout')
    async logout(): Promise<any> {
        throw new NotImplementedException();
    }

    @Post('refresh-tokens')
    async refreshTokens(): Promise<any> {
        throw new NotImplementedException();
    }

    @Post('forgot-password')
    async forgotPassword(): Promise<any> {
        throw new NotImplementedException();
    }

    @Post('reset-password')
    async resetPassword(): Promise<any> {
        throw new NotImplementedException();
    }

    @Post('send-verification-email')
    async sendVerificationEmail(): Promise<any> {
        throw new NotImplementedException();
    }

    @Post('verify-email')
    async verifyEmail(): Promise<any> {
        throw new NotImplementedException();
    }
}
