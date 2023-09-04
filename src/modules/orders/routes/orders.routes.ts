import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import Authentication from '@shared/http/middlewares/Authentication';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(Authentication);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.listOne,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
