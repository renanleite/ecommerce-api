import express from 'express'
import productRouter from './routes/productRoutes'
import {sequelize} from './database/Sequelize'

const app = express()
const port = 3000

app.use(express.json())
app.use(productRouter)

const startServer = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: false}) // create database tables if don't exist
        console.log('Database connection established successfully.')

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

startServer()
