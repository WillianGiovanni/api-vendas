import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import Authentication from '@shared/http/middlewares/Authentication';
import multer from 'multer';
import UploadUserAvatarController from '../controllers/UploadUserAvatarController';
import uploads from '@config/uploads';

const userRouter = Router();
const userController = new UsersController();
const usersAvatarController = new UploadUserAvatarController();

const upload = multer(uploads.multer);

userRouter.get('/', Authentication, userController.listAll);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRouter.patch(
  '/avatar',
  Authentication,
  upload.single('avatar'),
  usersAvatarController.upload,
);

export default userRouter;
