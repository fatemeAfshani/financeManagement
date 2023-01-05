import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

import productRouter from './routes/product'

const app = express()

app.use(express.json())

morgan.token('body', (req: Request, res: Response) => JSON.stringify(req.body))
app.use(
  morgan(
    '[:date] ":method :url HTTP/:http-version" :body :status  - :response-time ms -  :remote-addr - :res[content-length] '
  )
)

app.use('/products', productRouter)

export default app
