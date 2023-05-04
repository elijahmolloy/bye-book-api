import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import Client from 'mailgun.js/client';

@Injectable()
export class EmailService {
	private readonly mailgunClient: Client;

	constructor(configService: ConfigService) {
	    const mailgun = new Mailgun(formData);
	    this.mailgunClient = mailgun.client({
	        username: 'api',
	        key: configService.get('MAILGUN_PRIVATE_API_KEY')
	    });
	}

	async sendVerificationEmail() {
	    throw new NotImplementedException();
	}

	async sendResetPasswordEmail() {
		throw new NotImplementedException();
	}
}
