import {Router} from 'express'
import {productController} from '../controllers/ProductController'

const productRoutes = Router()

productRoutes.get('', productController.getAll)
productRoutes.get('/:id', productController.getById)
productRoutes.post('', productController.create)
productRoutes.patch('/:id', productController.update)
productRoutes.delete('/:id', productController.delete)

export default productRoutes
