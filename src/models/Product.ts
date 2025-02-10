import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database/Sequelize"

export interface ProductAttributes {
    id: number
    name: string
    price: number
    stock: number
}

export interface ProductCreatiionAttributes extends Omit<ProductAttributes, 'id'> {}

export class Product extends Model<ProductAttributes, ProductCreatiionAttributes>{
    id!: number
    name!: string
    price!: number
    stock!: number
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'products'
    }
)
