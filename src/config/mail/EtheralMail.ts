import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface IMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  template: IParseMailTemplate;
}

export default class EtheralMail {
  static async sendMail({ to, from, subject, template }: IMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailtemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'API Vendas Team',
        address: from?.email || 'team@apivendas.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailtemplate.parse(template),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
