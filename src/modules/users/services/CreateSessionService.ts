import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('Email or password incorrect.', 401);

    const comparePassword = await compare(password, user.password);

    if (!comparePassword)
      throw new AppError('Email or password incorrect.', 401);

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
