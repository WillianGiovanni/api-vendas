import { Request, Response } from 'express';
import ChangePasswordService from '../services/ChangePasswordService';

class ChangePasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const changePasswordService = new ChangePasswordService();

    await changePasswordService.execute({
      token,
      password,
    });

    return res.status(204).json();
  }
}

export default ChangePasswordController;
