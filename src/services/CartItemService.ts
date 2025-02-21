import {CartItemCreationAttributes} from '../models/CartItem'
import {cartItemRepository} from '../repositories/CartItemRepository'

class CartItemService {
    async getById(id: number) {
        return await cartItemRepository.getById(id)
    }

    async getAllItemsFromCart(cartId: number) {
        return await cartItemRepository.getAllItemsFromCart(cartId)
    }

    async getCartItemByCartAndProduct(cartId: number, productId: number) {
        return await cartItemRepository.getCartItemByCartAndProduct(
            cartId,
            productId,
        )
    }

    async create(body: CartItemCreationAttributes) {
        return await cartItemRepository.create(body)
    }

    async update(id: number, body: Partial<CartItemCreationAttributes>) {
        return await cartItemRepository.update(body, id)
    }

    async delete(id: number) {
        return await cartItemRepository.delete(id)
    }
}

export const cartItemService = new CartItemService()
