import {Product, ProductCreatiionAttributes} from '../models/Product'

class ProductRepository {
    async getAll(): Promise<Product[]> {
        return await Product.findAll()
    }

    async getById(id: number): Promise<Product | null> {
        return await Product.findByPk(id)
    }

    async create(product: ProductCreatiionAttributes): Promise<Product> {
        return await Product.create(product)
    }

    async update(
        id: number,
        updatedData: Partial<ProductCreatiionAttributes>,
    ): Promise<void> {
        await Product.update(updatedData, {where: {id}})
    }

    async deleteById(id: number): Promise<number> {
        return await Product.destroy({where: {id}})
    }
}

export const productRepository = new ProductRepository()
