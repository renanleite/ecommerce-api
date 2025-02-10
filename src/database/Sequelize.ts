import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize({
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'postgres'
    })
