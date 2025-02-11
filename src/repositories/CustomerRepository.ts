import {Customer, CustomerCreationAttributes} from '../models/Customer'

class CustomerRepository {
    async getAll(): Promise<Customer[]> {
        return await Customer.findAll()
    }

    async getById(id: number): Promise<Customer | null> {
        return await Customer.findByPk(id)
    }

    async create(body: CustomerCreationAttributes): Promise<Customer> {
        return await Customer.create(body)
    }

    async update(
        id: number,
        body: Partial<CustomerCreationAttributes>,
    ): Promise<void> {
        await Customer.update(body, {where: {id}})
    }

    async delete(id: number): Promise<number> {
        return await Customer.destroy({where: {id}})
    }
}

export const customerRepository = new CustomerRepository()
