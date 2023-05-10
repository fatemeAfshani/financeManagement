import { Router } from 'express'

import { Methods } from '../../types'
import {
  hasAdminAccess,
  hasViewerAccess,
  isAuth,
} from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import shareHolderValidate from './validate'
import {
  getIncomesOfAllUsersOfACompany,
  getIncomesOfAUserOrACompany,
  getIncomesOfOneOrder,
} from '../../controllers/income/getIncomes'

const shareHolderIncomeRouter = Router()

// for a company
shareHolderIncomeRouter.get(
  '/',
  isAuth,
  hasAdminAccess,
  shareHolderValidate(Methods.GetAll),
  errorHandler,
  getIncomesOfAllUsersOfACompany
)

shareHolderIncomeRouter.get(
  '/order/:id',
  isAuth,
  hasAdminAccess,
  shareHolderValidate(Methods.GetAllOfOneType),
  errorHandler,
  getIncomesOfOneOrder
)

shareHolderIncomeRouter.get(
  '/user',
  isAuth,
  hasViewerAccess,
  shareHolderValidate(Methods.GetOne),
  errorHandler,
  getIncomesOfAUserOrACompany
)

export default shareHolderIncomeRouter
