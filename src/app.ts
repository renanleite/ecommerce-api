import express from 'express'
import productRoutes from './routes/productRoutes'
import {sequelize} from './database/Sequelize'
import customerRoutes from './routes/customerRoutes'
import cartRoutes from './routes/cartRoutes'

const app = express()
const port = 3000

app.use(express.json())
app.use(productRoutes)
app.use(customerRoutes)
app.use(cartRoutes)

const startServer = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true}) // create database tables if don't exist
        console.log('Database connection established successfully.')

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

startServer()
