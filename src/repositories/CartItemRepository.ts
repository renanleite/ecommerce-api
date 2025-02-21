import {CartItem, CartItemCreationAttributes} from '../models/CartItem'

class CartItemRepository {
    async getById(id: number): Promise<CartItem | null> {
        return await CartItem.findByPk(id)
    }

    async getAllItemsFromCart(cartId: number): Promise<CartItem[]> {
        return await CartItem.findAll({where: {cartId}})
    }

    async getCartItemByCartAndProduct(
        cartId: number,
        productId: number,
    ): Promise<CartItem | null> {
        return await CartItem.findOne({where: {cartId, productId}})
    }

    async create(body: CartItemCreationAttributes): Promise<CartItem> {
        return await CartItem.create(body)
    }

    async update(
        body: Partial<CartItemCreationAttributes>,
        id: number,
    ): Promise<void> {
        await CartItem.update(body, {where: {id}})
    }

    async delete(id: number): Promise<number> {
        return await CartItem.destroy({where: {id}})
    }
}

export const cartItemRepository = new CartItemRepository()
