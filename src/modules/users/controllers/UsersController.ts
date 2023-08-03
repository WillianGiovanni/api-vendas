import { Request, Response } from 'express';
import User from '../typeorm/entities/User';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

class UsersController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();
    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export default UsersController;
