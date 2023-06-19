import { Router } from 'express'
import addOrder from '../../controllers/order/addOrder'
import {
  getOrder,
  getOrders,
  getOrdersOfOneProduct,
} from '../../controllers/order/getOrders'
import updateOrder from '../../controllers/order/updateOrder'

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

orderRouter.get(
  '/product/:id',
  isAuth,
  hasViewerAccess,
  orderValitate(Methods.GetAllOfOneType),
  errorHandler,
  getOrdersOfOneProduct
)

orderRouter.post(
  '/',
  isAuth,
  hasAdminAccess,
  orderValitate(Methods.Add),
  errorHandler,
  addOrder
)

orderRouter.post(
  '/:id',
  isAuth,
  hasAdminAccess,
  orderValitate(Methods.Update),
  errorHandler,
  updateOrder
)

export default orderRouter
