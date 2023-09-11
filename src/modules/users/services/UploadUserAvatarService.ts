import fs from 'fs';
import path from 'path';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import uploadsConfig from '@config/uploads';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

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

    if (uploadsConfig.driver === 's3') {
      const s3StorageProvider = new S3StorageProvider();

      if (user.avatar) {
        await s3StorageProvider.deleteFile(user.avatar);
      }

      const fileName = await s3StorageProvider.saveFile(avatarFilename);
      user.avatar = fileName;
    } else {
      const storageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    }

    await userRepository.save(user);
    return user;
  }
}

export default UploadUserAvatarService;
