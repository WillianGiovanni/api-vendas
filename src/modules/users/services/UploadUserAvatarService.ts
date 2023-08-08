import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import uploads from '@config/uploads';
import path from 'path';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UploadUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploads.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}

export default UploadUserAvatarService;
