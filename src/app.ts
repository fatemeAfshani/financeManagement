import './config'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import moment from 'jalali-moment'

import openapiSpecification from './swagger'
import productRouter from './routes/product'
import invoiceRouter from './routes/invoice'
import userRouter from './routes/user'

import logger from './logger'
import { translateErrorMessage } from './utils'
import stockRouter from './routes/stock'
import orderRouter from './routes/order'

const app = express()
app.use(express.json())

morgan.token('body', (req: Request) => JSON.stringify(req.body))
morgan.token('date', (req: Request) =>
  moment().format('jYYYY/jMM/jDD HH:mm:ss')
)

app.use(
  morgan(
    '[:date] ":method :url HTTP/:http-version" :body :status  - :response-time ms -  :remote-addr - :res[content-length] '
  )
)

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 100, // Limit each IP to 100 requests
  standardHeaders: true,
  legacyHeaders: false,
})

if (process.env.NODE_ENV !== 'test') app.use(limiter)
app.use(helmet())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

// we import json response of this route to postman
app.get('/docs/json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(openapiSpecification)
})

app.use('/products', productRouter)
app.use('/invoices', invoiceRouter)
app.use('/users', userRouter)
app.use('/stocks', stockRouter)
app.use('/orders', orderRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`error handler: ${err}`)
  res.send({ error: translateErrorMessage('error happened') })
})

export default app
