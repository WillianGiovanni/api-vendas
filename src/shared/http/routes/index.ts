import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import customerRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customer', customerRouter);
routes.use('/orders', ordersRouter);

export default routes;
