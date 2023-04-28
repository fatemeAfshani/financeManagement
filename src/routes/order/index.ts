import { Router } from 'express'
import addOrder from '../../controllers/order/addOrder'
import { getOrder } from '../../controllers/order/getOrder'

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

orderRouter.post(
  '/',
  isAuth,
  hasAdminAccess,
  orderValitate(Methods.Add),
  errorHandler,
  addOrder
)

export default orderRouter
