import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'postgres',
})
