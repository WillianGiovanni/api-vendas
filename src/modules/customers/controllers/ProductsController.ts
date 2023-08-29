import { Request, Response, response } from 'express';
import ListAllCustomerService from '../services/ListAllCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

class CustomerController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const listCustomers = new ListAllCustomerService();

    const customers = await listCustomers.execute();
    return res.json(customers);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });
    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({ name, email });
    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;
    const createCustomer = new UpdateCustomerService();

    const customer = await createCustomer.execute({ id, name, email });
    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });
    return res.json({
      message: 'Customer deleted',
    });
  }
}

export default CustomerController;
