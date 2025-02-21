import {Request, Response} from 'express'
import {cartItemService} from '../services/CartItemService'
import {CartItem} from '../models/CartItem'
import {cartService} from '../services/CartService'
import {productService} from '../services/ProductService'

class CartItemController {
    async getById(req: Request, res: Response) {
        try {
            const cart: CartItem | null = await cartItemService.getById(
                +req.params.id,
            )
            cart
                ? res.status(200).json(cart)
                : res.status(404).json({message: 'Cart not found'})
        } catch (error) {
            res.status(500).json({message: 'Error fetching cart item'})
        }
    }

    async getAllItemsFromCart(req: Request, res: Response) {
        try {
            const cartItems: CartItem[] =
                await cartItemService.getAllItemsFromCart(+req.params.cartId)
            res.status(200).json(cartItems)
        } catch (error) {
            res.status(500).json({message: 'Error fetching cart items'})
        }
    }

    async addItemToCart(req: Request, res: Response) {
        try {
            const cart = await cartService.getCartById(+req.body.cartId)
            if (!cart) {
                res.status(404).json({message: 'Cart not found'})
                return
            }

            const product = await productService.getProductById(
                +req.body.productId,
            )
            if (!product) {
                res.status(404).json({message: 'Product not found'})
                return
            }

            const newStock = product.stock - req.body.quantity

            if (newStock < 0) {
                res.status(400).json({
                    message:
                        'Not enough stock, we only have ' +
                        product.stock +
                        ' items left',
                })
                return
            }

            const cartItem = await cartItemService.getCartItemByCartAndProduct(
                +req.body.cartId,
                +req.body.productId,
            )

            if (cartItem) {
                const newQuantity = cartItem.quantity + req.body.quantity
                await cartItemService.update(cartItem.cartId, {
                    quantity: newQuantity,
                })
                await productService.updateProduct(product.id, {
                    stock: newStock,
                })
                res.status(201).json({message: 'Item added to cart'})
                return
            }

            await cartItemService.create(req.body)
            await productService.updateProduct(product.id, {
                stock: newStock,
            })

            res.status(201).json({message: 'Item added to cart'})
        } catch (error: any) {
            res.status(500).json({
                message: 'Error adding item to cart',
                error: error.message,
            })
        }
    }

    async updateCartItem(req: Request, res: Response) {
        try {
            await cartItemService.update(+req.params.id, req.body)
            res.status(204).send()
        } catch (error) {
            res.status(500).json({message: 'Error updating cart item'})
        }
    }

    async deleteCartItem(req: Request, res: Response) {
        try {
            await cartItemService.delete(+req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(500).json({message: 'Error deleting cart item'})
        }
    }
}

export const cartItemController = new CartItemController()
