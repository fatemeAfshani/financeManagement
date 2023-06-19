import { Router } from 'express'
import {
  getCompanyTotal,
  getUserTotal,
  getTotalNumbers,
} from '../../controllers/chartData/getData'
import {
  getCountOfOrders,
  getSumOfIncomes,
} from '../../controllers/chartData/getDataWithPeriod'
import { Methods } from '../../types'

import { isAuth, hasViewerAccess } from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import chartValidate from './validate'

const chartRouter = Router()

chartRouter.get('/user', isAuth, hasViewerAccess, getUserTotal)
chartRouter.get('/company', isAuth, hasViewerAccess, getCompanyTotal)
chartRouter.get('/total', isAuth, hasViewerAccess, getTotalNumbers)
chartRouter.get(
  '/orders',
  isAuth,
  hasViewerAccess,
  chartValidate(Methods.GetAll),
  errorHandler,
  getCountOfOrders
)
chartRouter.get(
  '/income',
  isAuth,
  hasViewerAccess,
  chartValidate(Methods.GetAll),
  errorHandler,
  getSumOfIncomes
)

export default chartRouter
