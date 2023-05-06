import { Router } from 'express'
import addCheckout from '../../controllers/checkout/addCheckout'

import addOrUpdateShareHolders from '../../controllers/shareHolder/addOrUpdateShareHolders'
import { Methods } from '../../types'
import { hasAdminAccess, isAuth } from '../../utils/middlewares/auth'
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

export default checkoutRouter
