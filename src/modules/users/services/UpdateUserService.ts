import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const checkUpdatedEmail = await userRepository.findByEmail(email);

    if (checkUpdatedEmail && checkUpdatedEmail.id !== user.id) {
      throw new AppError('This email is already in use.');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
