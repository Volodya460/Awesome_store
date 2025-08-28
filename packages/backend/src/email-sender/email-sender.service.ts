import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import * as Brevo from '@getbrevo/brevo';
import { ConfigService } from '@nestjs/config';

interface SendMailData {
	to: string;
	subject: string;
	html: string;
}

@Injectable()
export class EmailService {
	private readonly api: Brevo.TransactionalEmailsApi;
	private readonly sender: Brevo.SendSmtpEmailSender;
	private readonly logger = new Logger(EmailService.name);

	constructor(private readonly config: ConfigService) {
		const apiKey = this.config.get<string>('BREVO_API_KEY');
		const fromEmail = this.config.get<string>('BREVO_SENDER_EMAIL');
		const fromName = this.config.get<string>('BREVO_SENDER_NAME') ?? 'App';

		if (!apiKey) {
			throw new InternalServerErrorException(
				'BREVO_API_KEY is not provided',
			);
		}
		if (!fromEmail) {
			throw new InternalServerErrorException(
				'BREVO_SENDER_EMAIL is not provided',
			);
		}

		this.api = new Brevo.TransactionalEmailsApi();
		this.api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

		this.sender = { email: fromEmail, name: fromName };
	}

	async sendMail({ to, subject, html }: SendMailData): Promise<boolean> {
		try {
			const email = new Brevo.SendSmtpEmail();
			email.sender = this.sender;
			email.to = [{ email: to }];
			email.subject = subject;
			email.htmlContent = html;

			await this.api.sendTransacEmail(email); // обязательный await
			return true;
		} catch (err: any) {
			const detail =
				err?.response?.text ??
				err?.response?.body ??
				err?.message ??
				String(err);
			this.logger.error(`Brevo sendMail error: ${detail}`);
			throw new InternalServerErrorException('Failed to send email');
		}
	}
}
