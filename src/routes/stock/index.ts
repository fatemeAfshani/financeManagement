import { Router } from 'express'

import {
  getStocks,
  getStocksOfOneProduct,
} from '../../controllers/stock/getProductStock'
import { Methods } from '../../types'
import { hasViewerAccess, isAuth } from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import stockValitate from './validate'

const stockRouter = Router()

stockRouter.get(
  '/',
  isAuth,
  hasViewerAccess,
  stockValitate(Methods.GetAll),
  errorHandler,
  getStocks
)

stockRouter.get(
  '/product/:id',
  isAuth,
  hasViewerAccess,
  stockValitate(Methods.GetAllOfOneType),
  errorHandler,
  getStocksOfOneProduct
)

export default stockRouter
