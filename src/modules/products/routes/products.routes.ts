import { Router } from 'express';
import ProductController from '../controllers/ProductsController';
import { celebrate, Segments, Joi } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get('/', productsController.listAll);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.listOne,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(250).required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().min(3).max(250),
      price: Joi.number().precision(2),
      quantity: Joi.number(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
