import { Request, Response, response } from 'express';
import ListProductsService from '../services/ListProductsService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

class ProductController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductsService();

    const products = await listProducts.execute();
    return res.json(products);
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });
    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });
    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, price, quantity } = req.body;
    const createProduct = new UpdateProductService();

    const product = await createProduct.execute({ id, name, price, quantity });
    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });
    return res.json({
      message: 'Product deleted',
    });
  }
}

export default ProductController;
