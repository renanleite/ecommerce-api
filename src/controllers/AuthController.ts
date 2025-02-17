import {Request, Response} from 'express'
import {customerService} from '../services/CustomerService'
import {generateToken} from '../auth/auth'

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        const {name, email} = req.body

        try {
            const existingCustomer =
                await customerService.getCustomerByEmail(email)
            if (existingCustomer) {
                res.status(400).json({
                    message: `User with email ${email} already exists`,
                })
                return
            }

            const customer = await customerService.createCustomer({
                email,
                name,
            })

            res.status(201).json({
                message: 'User created',
                customer,
            })
        } catch (error) {
            res.status(500).json({message: 'Error registering user', error})
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const {email} = req.body

        try {
            const customer = await customerService.getCustomerByEmail(email)
            if (!customer) {
                res.status(400).json({message: 'Invalid email'})
                return
            }

            const token = generateToken({
                customerId: customer.id,
                email: customer.email,
            })

            res.status(200).json({message: 'Login successful', token: token})
        } catch (error) {
            res.status(500).json({message: 'Error when trying to login'})
        }
    }
}

export const authController = new AuthController()
