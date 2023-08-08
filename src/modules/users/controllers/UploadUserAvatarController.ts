import { Request, Response } from 'express';
import UploadUserAvatarService from '../services/UploadUserAvatarService';

export default class UploadUserAvatarController {
  public async upload(req: Request, res: Response): Promise<Response> {
    const uploadAvatar = new UploadUserAvatarService();
    console.log(req);
    console.log(req.body);

    const user = uploadAvatar.execute({
      userId: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(user);
  }
}