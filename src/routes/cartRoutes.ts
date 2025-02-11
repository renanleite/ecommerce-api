import {Router} from 'express'
import {cartController} from '../controllers/CartController'

const cartRoutes = Router()

cartRoutes.get('/carts', cartController.getAll)
cartRoutes.get('/carts/:id', cartController.getById)
cartRoutes.post('/carts', cartController.create)
cartRoutes.patch('/carts/:id', cartController.update)
cartRoutes.delete('/carts/:id', cartController.delete)

export default cartRoutes
