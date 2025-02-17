import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/Sequelize'

export interface CustomerAttributes {
    id: number
    name: string
    email: string
    password: string
}

export interface CustomerCreationAttributes
    extends Omit<CustomerAttributes, 'id'> {}

export class Customer extends Model<
    CustomerAttributes,
    CustomerCreationAttributes
> {
    id!: number
    name!: string
    email!: string
    password!: string
}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'customers',
    },
)
