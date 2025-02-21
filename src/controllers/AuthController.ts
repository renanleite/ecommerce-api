import {Request, Response} from 'express'
import {customerService} from '../services/CustomerService'
import {comparePasswords, generateToken, hashPassword} from '../auth/auth'
import {isBodyEmpty, isBodyValid} from '../utils/Validation'

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        const {name, email, password} = req.body

        const requiredFields: string[] = ['name', 'email', 'password']
        if (isBodyEmpty(req, res) || !isBodyValid(req, res, requiredFields)) {
            return
        }

        try {
            const existingCustomer =
                await customerService.getCustomerByEmail(email)
            if (existingCustomer) {
                res.status(400).json({
                    message: `User with email ${email} already exists`,
                })
                return
            }

            const hashedPassword = await hashPassword(password)

            const customer = await customerService.createCustomer({
                name,
                email,
                password: hashedPassword,
            })

            res.status(201).json({
                message: 'Customer created',
                customer,
            })
        } catch (error) {
            res.status(500).json({message: 'Error registering user', error})
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const {email, password} = req.body

        try {
            const customer = await customerService.getCustomerByEmail(email)
            if (!customer) {
                res.status(400).json({message: 'Invalid email'})
                return
            }

            const isPasswordValid = await comparePasswords(
                password,
                customer.password,
            )
            if (!isPasswordValid) {
                res.status(400).json({message: 'Wrong password'})
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
