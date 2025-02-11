// models/CartItem.ts
import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/Sequelize'
import {Cart} from './Cart'
import {Product} from './Product'

export interface CartItemAttributes {
    id: number
    cartId: number
    productId: number
    quantity: number
}

export interface CartItemCreationAttributes
    extends Omit<CartItemAttributes, 'id'> {}

export class CartItem extends Model<
    CartItemAttributes,
    CartItemCreationAttributes
> {
    cartId!: number
    productId!: number
    quantity!: number
}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'carts',
                key: 'id',
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: 'cart_items',
    },
)

CartItem.belongsTo(Cart, {foreignKey: 'cartId'})
CartItem.belongsTo(Product, {foreignKey: 'productId'})
