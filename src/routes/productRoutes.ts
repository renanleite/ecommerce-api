import {Router} from 'express'
import {productController} from '../controllers/ProductController'

const productRoutes = Router()

productRoutes.get('/products', productController.getAll)
productRoutes.get('/products/:id', productController.getById)
productRoutes.post('/products', productController.create)
productRoutes.patch('/products/:id', productController.update)
productRoutes.delete('/products/:id', productController.delete)

export default productRoutes
