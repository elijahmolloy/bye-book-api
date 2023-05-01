import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [UsersModule, AuthModule, TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
