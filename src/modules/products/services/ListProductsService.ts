import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    // const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCTS-LIST',
    );

    if (!products) {
      products = await productRepository.find();

      await redisCache.save('api-vendas-PRODUCTS-LIST', products);
    }

    return products;
  }
}

export default ListProductsService;
