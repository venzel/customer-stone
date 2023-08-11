import { AxiosHttpClient } from '@/commons/clients/axios-http.client';
import { RepositoryInterface } from '@/domain/@shared/contracts';
import { CustomerMongooseRepository } from '@/infra/database/repositories';
import { ProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { IoRedisCacheProvider } from '@/infra/providers/cache/ioredis-cache.provider';
import { StonePaymentProvider } from '@/infra/providers/payment/stone-payment.provider';
import { CustomerControllerInterface } from '@/presentation/@shared/contracts';
import { CustomerController } from '@/presentation/controllers/customer.controller';
import { CreateCustomerUseCase, FindOneCustomerUseCase, UpdateCustomerUseCase } from '@/usecase/customer';

export const MakeCustomerController = async (): Promise<CustomerControllerInterface> => {
    const axiosInstance = new AxiosHttpClient().getInstance();

    const repository: RepositoryInterface = {
        customer: new CustomerMongooseRepository(),
    };

    const provider: ProviderInterface = {
        cache: new IoRedisCacheProvider(),
        payment: new StonePaymentProvider(axiosInstance),
    };

    const createCustomerUseCase = new CreateCustomerUseCase(repository, provider);
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository, provider);
    const findOneCustomerUseCase = new FindOneCustomerUseCase(repository);

    return new CustomerController(createCustomerUseCase, updateCustomerUseCase, findOneCustomerUseCase);
};