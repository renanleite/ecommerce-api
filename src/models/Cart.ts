import { Product } from "./Product";

export class Cart {
    id: number
    userId: number
    items: Product[]
    totalPrice: number

    addItem(product: Product) {
        if(product.stock > 0) {
            this.items.push(product)
            product.stock--
        }
    }

    removeItem(productId: number) {
        const index = this.items.findIndex(item => item.id === productId)
        if (index === -1) {
            throw new Error("This product was not found in the cart")
        }
        this.items.splice(index, 1)
    }
}
