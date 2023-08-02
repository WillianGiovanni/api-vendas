import { Router } from 'express';
import ProductController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get('/', productsController.listAll);
productsRouter.get('/:id', productsController.listOne);
productsRouter.post('/', productsController.create);
productsRouter.put('/', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
