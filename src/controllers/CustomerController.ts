import {Customer} from '../models/Customer'
import {customerService} from '../services/CustomerService'
import {Request, Response} from 'express'

class CustomerController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const customers = await customerService.getAllCustomers()
            res.status(200).json(customers)
        } catch (error) {
            res.status(500).send('Error fetching customers')
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const customer = await customerService.getCustomerById(+req.params.id)
            if (!customer) {
                res.status(404).send('Customer not found')
            }
            res.status(200).json(customer)
        } catch (error) {
            res.status(500).send('Error fetching customer')
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        if (Object.keys(req.body).length === 0) {
            res.status(400).send('Body cannot be empty')
            return
        }
        try {
            const customer: Customer = await customerService.createCustomer(
                req.body,
            )
            res.status(201).json({
                id: customer.id,
                name: customer.name,
                email: customer.email,
            })
        } catch (error) {
            res.status(500).send('Error creating customer')
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        if (Object.keys(req.body).length === 0) {
            res.status(400).send('Body cannot be empty')
            return
        }
        try {
            await customerService.updateCustomer(+req.params.id, req.body)
            res.status(204).send()
        } catch (error) {
            res.status(500).send('Error updating customer')
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            await customerService.deleteCustomer(+req.params.id)
            res.status(204)
        } catch (error) {
            res.status(500).send('Error deleting customer')
        }
    }
}

export const customerController = new CustomerController()
