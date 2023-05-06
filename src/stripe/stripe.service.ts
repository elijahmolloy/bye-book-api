import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
	private stripe: Stripe;

	constructor(configService: ConfigService) {
		this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), { apiVersion: '2022-11-15' });
	}

	async createConnectAccount(user: User): Promise<Stripe.Account> {
		if (user.connectAccountId) {
			throw new BadRequestException('Connect account already created for this user');
		}

		const account = await this.stripe.accounts.create({
			country: 'US',
			type: 'custom',
			capabilities: {
				card_payments: {
					requested: true
				},
				transfers: {
					requested: true
				}
			},
			email: user.email,
			business_type: 'individual'
		});

		user.connectAccountId = account.id;
		await user.save();

		return account;
	}

	async deleteConnectAccount(user: User) {
		await this.stripe.accounts.del(user.connectAccountId);
	}
}
