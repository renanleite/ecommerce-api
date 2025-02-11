import {Product} from '../models/Product'
import {productService} from '../services/ProductService'
import {Request, Response} from 'express'
import {isBodyEmpty} from '../utils/Validation'

class ProductController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.getAllProducts()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).send('Error fetching products')
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const product = await productService.getProductById(+req.params.id)
            if (!product) {
                res.status(404).send('Product not found')
            }
            res.status(200).json(product)
        } catch (error) {
            res.status(500).send('Error fetching product')
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        if (isBodyEmpty(req, res)) {
            return
        }
        try {
            const product: Product = await productService.createProduct(
                req.body,
            )
            res.status(201).json({
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
            })
        } catch (error) {
            res.status(500).send('Error creating product')
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        if (isBodyEmpty(req, res)) {
            return
        }
        try {
            await productService.updateProduct(+req.params.id, req.body)
            res.status(204).send()
        } catch (error) {
            res.status(500).send('Error updating product')
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            await productService.deleteProduct(+req.params.id)
            res.status(204)
        } catch (error) {
            res.status(500).send('Error deleting product')
        }
    }
}

export const productController = new ProductController()
