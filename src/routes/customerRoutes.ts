import {Router} from 'express'
import {customerController} from '../controllers/CustomerController'

const customerRoutes = Router()

customerRoutes.get('/customers', customerController.getAll)
customerRoutes.get('/customers/:id', customerController.getById)
customerRoutes.post('/customers', customerController.create)
customerRoutes.patch('/customers/:id', customerController.update)
customerRoutes.delete('/customers/:id', customerController.delete)

export default customerRoutes
