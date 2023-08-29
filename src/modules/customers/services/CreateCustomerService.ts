import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    if (await customerRepository.findByEmail(email))
      throw new AppError('Email already in use');

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
