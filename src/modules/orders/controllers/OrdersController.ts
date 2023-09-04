import { Request, Response, response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

class OrdersController {
  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });
    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customerId, products } = req.body;
    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customerId, products });
    return res.json(order);
  }
}

export default OrdersController;
