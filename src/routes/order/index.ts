import { Router } from 'express'
import addOrder from '../../controllers/order/addOrder'
import { getOrder, getOrders } from '../../controllers/order/getOrder'

import { Methods } from '../../types'
import {
  hasAdminAccess,
  hasViewerAccess,
  isAuth,
} from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import orderValitate from './validate'

const orderRouter = Router()

orderRouter.get(
  '/:id',
  isAuth,
  hasViewerAccess,
  orderValitate(Methods.GetOne),
  errorHandler,
  getOrder
)

orderRouter.get(
  '/',
  isAuth,
  hasViewerAccess,
  orderValitate(Methods.GetAll),
  errorHandler,
  getOrders
)

orderRouter.post(
  '/',
  isAuth,
  hasAdminAccess,
  orderValitate(Methods.Add),
  errorHandler,
  addOrder
)

export default orderRouter
