import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CustomerController from '../controllers/ProductsController';
import Authentication from '@shared/http/middlewares/Authentication';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(Authentication);

customerRouter.get('/', customerController.listAll);

customerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.listOne,
);

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(250).required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
);

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(250),
      email: Joi.string().email(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  customerController.update,
);

customerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  customerController.delete,
);

export default customerRouter;
