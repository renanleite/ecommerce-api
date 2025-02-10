import { Cart } from "./Cart"
import { Customer } from "./Customer"
import { Product } from "./Product"

export class Order {
    id: number
    customerId: number
    items: Product[]
    totalPrice: number
    status: string
}