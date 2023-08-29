import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ChangePasswordController from '../controllers/ChangePasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const changePasswordController = new ChangePasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  changePasswordController.create,
);

export default passwordRouter;
