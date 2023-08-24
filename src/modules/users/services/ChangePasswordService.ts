import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  token: string;
  password: string;
}

class ChangePasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User token does not exists');

    const user = await userRepository.findById(userToken.userId);

    if (!user) throw new AppError('User not found');

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

    user.password = await hash(password, 10);

    await userRepository.save(user);
  }
}

export default ChangePasswordService;
