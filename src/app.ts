import express from 'express'
import {sequelize} from './database/Sequelize'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes'
import customerRoutes from './routes/customerRoutes'
import cartRoutes from './routes/cartRoutes'
import authRoutes from './routes/authRoutes'
import {authenticate} from './middlewares/AuthMiddleware'
import cartItemRoutes from './routes/cartItemRoutes'

const app = express()
const port = 3000
dotenv.config()

app.use(express.json())

app.use(authRoutes)

// Authenticated routes
app.use(authenticate)
app.use('/products', productRoutes)
app.use('/customers', customerRoutes)
app.use('/carts', cartRoutes)
app.use('/cart-items', cartItemRoutes)

const startServer = async () => {
    try {
        await sequelize.authenticate()
        // await sequelize.sync({force: false}) // create database tables if don't exist
        console.log('Database connection established successfully.')

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

startServer()
