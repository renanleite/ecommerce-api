import { Order } from "./Order"

export class Customer {
    id: number
    name: string
    email: string
    orders: Order[]

    constructor(id: number, name: string, email: string) {
        this.id = id
        this.name = name
        this.email = email
    }
}
