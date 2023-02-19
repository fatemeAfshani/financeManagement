import './config'
import express, { Errback, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import productRouter from './routes/product'
import invoiceRouter from './routes/invoice'
import logger from './logger'
import { translateErrorMessage } from './utils'

const app = express()

app.use(express.json())

morgan.token('body', (req: Request) => JSON.stringify(req.body))
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

app.use('/products', productRouter)
app.use('/invoices', invoiceRouter)

app.use((err: Errback, req: Request, res: Response, _: NextFunction) => {
  logger.error(`error handler: ${err}`)
  res.status(500).send({ error: translateErrorMessage('error happened') })
})

export default app
