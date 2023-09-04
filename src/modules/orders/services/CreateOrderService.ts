import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Orders from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import CustomerRepository from '@modules/customers/typeorm/repositories/CustomerRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customerId: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customerId, products }: IRequest): Promise<Orders> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customerId);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { orderProducts } = order;

    const updatedProductQuantity = orderProducts.map(product => ({
      id: product.productId,
      quantity:
        existsProducts.filter(p => p.id === product.productId)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
