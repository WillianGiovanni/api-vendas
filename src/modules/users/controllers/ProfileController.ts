import { Request, Response } from 'express';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showUserService = new ShowUserService();
    const id = req.user.id;

    const users = await showUserService.execute({ id });
    return res.json(users);
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

    return res.json(user);
  }
}

export default ProfileController;
