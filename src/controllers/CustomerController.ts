import {Customer} from '../models/Customer'
import {customerService} from '../services/CustomerService'
import {Request, Response} from 'express'
import {isBodyEmpty} from '../utils/Validation'

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
            const customer = await customerService.getCustomerById(
                +req.params.id,
            )
            if (!customer) {
                res.status(404).send('Customer not found')
            }
            res.status(200).json(customer)
        } catch (error) {
            res.status(500).send('Error fetching customer')
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        if (isBodyEmpty(req, res)) {
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
