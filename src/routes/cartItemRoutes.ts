import {Router} from 'express'
import {cartItemController} from '../controllers/CartItemController'

const cartItemRoutes = Router()

cartItemRoutes.get('/:cartId', cartItemController.getAllItemsFromCart)
cartItemRoutes.get('/:id', cartItemController.getById)
cartItemRoutes.post('', cartItemController.addItemToCart)
cartItemRoutes.patch('/:id', cartItemController.updateCartItem)
cartItemRoutes.delete('/:id', cartItemController.deleteCartItem)

export default cartItemRoutes
