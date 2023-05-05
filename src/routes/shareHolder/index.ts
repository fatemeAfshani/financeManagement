import { Router } from 'express'

import addOrUpdateShareHolders from '../../controllers/shareHolder/addOrUpdateShareHolders'
import { Methods } from '../../types'
import {
  hasAdminAccess,
  hasViewerAccess,
  isAuth,
} from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import shareHolderValitate from './validate'
import {
  getIncomesOfAllUsersOfACompany,
  getIncomesOfAUserOrACompany,
  getIncomesOfOneOrder,
} from '../../controllers/shareHolder/getIncomes'

const shareHolderRouter = Router()

// add or update a shareHolder

shareHolderRouter.post(
  '/',
  isAuth,
  hasAdminAccess,
  shareHolderValitate(Methods.Add),
  errorHandler,
  addOrUpdateShareHolders
)

// for a company
shareHolderRouter.get(
  '/',
  isAuth,
  hasAdminAccess,
  shareHolderValitate(Methods.GetAll),
  errorHandler,
  getIncomesOfAllUsersOfACompany
)

shareHolderRouter.get(
  '/order/:id',
  isAuth,
  hasAdminAccess,
  shareHolderValitate(Methods.GetAllOfOneType),
  errorHandler,
  getIncomesOfOneOrder
)

shareHolderRouter.get(
  '/user',
  isAuth,
  hasViewerAccess,
  shareHolderValitate(Methods.GetOne),
  errorHandler,
  getIncomesOfAUserOrACompany
)

export default shareHolderRouter
