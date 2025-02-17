import {Router} from 'express'
import {cartController} from '../controllers/CartController'

const cartRoutes = Router()

cartRoutes.get('', cartController.getAll)
cartRoutes.get('/:id', cartController.getById)
cartRoutes.post('', cartController.create)
cartRoutes.patch('/:id', cartController.update)
cartRoutes.delete('/:id', cartController.delete)

export default cartRoutes
