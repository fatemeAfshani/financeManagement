import express from 'express'

import { testRouter } from './routes/test'
import {productRouter} from './routes/product'

const app = express()

app.use(express.json())

app.use('/test',testRouter)
app.use('/products', productRouter)

export default app