import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowUserService;
