import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Bem vindo a Api de Vendas' });
});

export default routes;
