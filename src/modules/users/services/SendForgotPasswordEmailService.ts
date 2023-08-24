import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtheralMail from '@config/mail/EtheralMail';
import { template } from 'handlebars';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const token = await userTokenRepository.generateToken(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs',
    );

    await EtheralMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Password Recovery',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:2999/reset_password?token=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
