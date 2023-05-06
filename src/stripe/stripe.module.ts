import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule],
	exports: [StripeService],
	providers: [StripeService]
})
export class StripeModule {}
