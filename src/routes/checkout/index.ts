import { Router } from 'express'
import addCheckout from '../../controllers/checkout/addCheckout'
import {
  getACheckout,
  getCheckoutsOfACompany,
  getCheckoutsOfAUser,
} from '../../controllers/checkout/getCheckouts'

import { Methods } from '../../types'
import {
  hasAdminAccess,
  hasViewerAccess,
  isAuth,
} from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'

import checkoutValitate from './validate'

const checkoutRouter = Router()

// add or update a shareHolder

checkoutRouter.post(
  '/',
  isAuth,
  hasAdminAccess,
  checkoutValitate(Methods.Add),
  errorHandler,
  addCheckout
)
// for a company
checkoutRouter.get(
  '/',
  isAuth,
  hasAdminAccess,
  checkoutValitate(Methods.GetAll),
  errorHandler,
  getCheckoutsOfACompany
)
checkoutRouter.get(
  '/:id',
  isAuth,
  hasAdminAccess,
  checkoutValitate(Methods.GetOne),
  errorHandler,
  getACheckout
)

checkoutRouter.get(
  '/user/:id',
  isAuth,
  hasViewerAccess,
  checkoutValitate(Methods.GetAllOfOneType),
  errorHandler,
  getCheckoutsOfAUser
)
export default checkoutRouter
