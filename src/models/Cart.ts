import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/Sequelize'
import {Customer} from './Customer'

export interface CartAttributes {
    id: number
    customerId: number
    totalPrice: number
}

export interface CartCreationAttributes extends Omit<CartAttributes, 'id'> {}

export class Cart extends Model<CartAttributes, CartCreationAttributes> {
    customerId!: number
    totalPrice!: number
}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'customers',
                key: 'id',
            },
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
    },
    {
        sequelize,
        tableName: 'carts',
    },
)

Cart.belongsTo(Customer, {foreignKey: 'customerId'})
