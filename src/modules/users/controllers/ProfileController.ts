import { Request, Response } from 'express';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';
import { instanceToInstance } from 'class-transformer';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showUserService = new ShowUserService();
    const id = req.user.id;

    const users = await showUserService.execute({ id });
    return res.json(instanceToInstance(users));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.user.id;
    const { name, email, password, oldPassword } = req.body;
    const updateProfileService = new UpdateUserService();

    const user = await updateProfileService.execute({
      id,
      name,
      email,
      password,
      oldPassword,
    });

    return res.json(instanceToInstance(user));
  }
}

export default ProfileController;
