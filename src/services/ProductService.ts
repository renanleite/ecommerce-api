import {Product, ProductCreatiionAttributes} from '../models/Product'
import {productRepository} from '../repositories/ProductRepository'

class ProductService {
    async getAllProducts(): Promise<Product[]> {
        return await productRepository.getAll()
    }

    async getProductById(id: number): Promise<Product | null> {
        return await productRepository.getById(id)
    }

    async createProduct(product: ProductCreatiionAttributes): Promise<Product> {
        return await productRepository.create(product)
    }

    async updateProduct(
        id: number,
        product: ProductCreatiionAttributes,
    ): Promise<Product | null> {
        return await productRepository.update(id, product)
    }

    async deleteProduct(id: number): Promise<boolean> {
        const deletedNumber = await productRepository.deleteById(id)
        return deletedNumber === 0 ? false : true
    }
}

export const productService = new ProductService()
