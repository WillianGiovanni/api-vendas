import { Repository, EntityRepository } from 'typeorm';
import Orders from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';

interface IProducts {
  productId: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProducts[];
}

@EntityRepository(Orders)
class OrdersRepository extends Repository<Orders> {
  public async findById(id: string): Promise<Orders | undefined> {
    const order = this.findOne(id, {
      relations: ['orderProducts', 'customer'],
    });
    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Orders> {
    const order = this.create({
      customer,
      orderProducts: products,
    });

    await this.save(order);
    return order;
  }
}

export default OrdersRepository;
