import express from 'express'
import productRouter from './routes/productRoutes'

const app = express()
const port = 3000

app.use(express.json())
app.use(productRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
