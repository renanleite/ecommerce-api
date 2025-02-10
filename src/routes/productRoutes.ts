import { Router } from "express";
import { productController } from "../controllers/ProductController";

const productRouter = Router()

productRouter.get('/products', productController.getAll)
productRouter.get('/products/:id', productController.getById)
productRouter.post('/products', productController.create)
productRouter.patch('/products/:id', productController.update)
productRouter.delete('/products/:id', productController.delete)

export default productRouter
