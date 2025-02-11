import {Cart, CartCreationAttributes} from '../models/Cart'
import {cartRepository} from '../repositories/CartRepository'

class CartService {
    async getAllCarts(): Promise<Cart[]> {
        return await cartRepository.getAll()
    }

    async getCartById(id: number): Promise<Cart | null> {
        return await cartRepository.getById(id)
    }

    async createCart(body: CartCreationAttributes): Promise<Cart> {
        return await cartRepository.create(body)
    }

    async updateCart(id: number, body: CartCreationAttributes): Promise<void> {
        await cartRepository.update(id, body)
    }

    async deleteCart(id: number): Promise<number> {
        return await cartRepository.delete(id)
    }
}

export const cartService = new CartService()
