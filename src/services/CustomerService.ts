import {Customer, CustomerCreationAttributes} from '../models/Customer'
import {customerRepository} from '../repositories/CustomerRepository'

class CustomerService {
    async getAllCustomers(): Promise<Customer[]> {
        return await customerRepository.getAll()
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        return await customerRepository.getById(id)
    }

    async getCustomerByEmail(email: string): Promise<Customer | null> {
        return await customerRepository.getByEmail(email)
    }

    async createCustomer(body: CustomerCreationAttributes): Promise<Customer> {
        return await customerRepository.create(body)
    }

    async updateCustomer(
        id: number,
        body: CustomerCreationAttributes,
    ): Promise<void> {
        await customerRepository.update(id, body)
    }

    async deleteCustomer(id: number): Promise<number> {
        return await customerRepository.delete(id)
    }
}

export const customerService = new CustomerService()
