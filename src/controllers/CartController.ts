// controllers/CartController.ts
import {Cart} from '../models/Cart'
import {cartService} from '../services/CartService'
import {Request, Response} from 'express'
import {customerService} from '../services/CustomerService'
import {isBodyEmpty} from '../utils/Validation'

class CartController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const carts = await cartService.getAllCarts()
            res.status(200).json(carts)
        } catch (error) {
            res.status(500).send('Error fetching carts')
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const cart = await cartService.getCartById(+req.params.id)
            if (!cart) {
                res.status(404).send('Cart not found')
                return
            }
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).send('Error fetching cart')
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        if (isBodyEmpty(req, res)) {
            return
        }
        try {
            const customer = await customerService.getCustomerById(
                +req.body.customerId,
            )
            if (!customer) {
                res.status(404).send('This customer does not exist')
                return
            }
            const cart: Cart = await cartService.createCart(req.body)
            res.status(201).json(cart)
        } catch (error) {
            res.status(500).send('Error creating cart')
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        if (isBodyEmpty(req, res)) {
            return
        }
        try {
            await cartService.updateCart(+req.params.id, req.body)
            res.status(204).send()
        } catch (error) {
            res.status(500).send('Error updating cart')
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            await cartService.deleteCart(+req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(500).send('Error deleting cart')
        }
    }
}

export const cartController = new CartController()
