import {Cart, CartCreationAttributes} from '../models/Cart'
import {CartItem} from '../models/CartItem'

class CartRepository {
    async getAll(): Promise<Cart[]> {
        return await Cart.findAll()
    }

    async getById(id: number): Promise<Cart | null> {
        return await Cart.findByPk(id, {
            include: [{model: CartItem, as: 'items'}],
        })
    }

    async create(body: CartCreationAttributes): Promise<Cart> {
        return await Cart.create(body)
    }

    async update(
        id: number,
        body: Partial<CartCreationAttributes>,
    ): Promise<void> {
        await Cart.update(body, {where: {id}})
    }

    async delete(id: number): Promise<number> {
        return await Cart.destroy({where: {id}})
    }
}

export const cartRepository = new CartRepository()
