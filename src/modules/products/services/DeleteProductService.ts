import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import UpdateProductService from './UpdateProductService';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCTS-LIST');

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
