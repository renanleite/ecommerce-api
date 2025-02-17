import {Router} from 'express'
import {customerController} from '../controllers/CustomerController'

const customerRoutes = Router()

customerRoutes.get('', customerController.getAll)
customerRoutes.get('/:id', customerController.getById)
customerRoutes.patch('/:id', customerController.update)
customerRoutes.delete('/:id', customerController.delete)

export default customerRoutes
