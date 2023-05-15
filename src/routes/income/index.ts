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
import {
  getTotalIncomesOfAllUsersOfACompany,
  getTotalIncomesOfAUserOrACompany,
} from '../../controllers/income/getTotalIncomes'

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
  '/total',
  isAuth,
  hasViewerAccess,
  shareHolderValidate(Methods.GetTotal),
  errorHandler,
  getTotalIncomesOfAllUsersOfACompany
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
shareHolderIncomeRouter.get(
  '/user/total',
  isAuth,
  hasViewerAccess,
  shareHolderValidate(Methods.GetTotalUser),
  errorHandler,
  getTotalIncomesOfAUserOrACompany
)

export default shareHolderIncomeRouter
