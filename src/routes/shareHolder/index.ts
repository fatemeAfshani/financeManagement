import { Router } from 'express'

import addOrUpdateShareHolders from '../../controllers/shareHolder/addOrUpdateShareHolders'
import { Methods } from '../../types'
import { hasAdminAccess, isAuth } from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import shareHolderValitate from './validate'
import {
  getIncomesOfACompany,
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

shareHolderRouter.get(
  '/',
  isAuth,
  hasAdminAccess,
  shareHolderValitate(Methods.GetAll),
  errorHandler,
  getIncomesOfACompany
)

shareHolderRouter.get(
  '/order/:id',
  isAuth,
  hasAdminAccess,
  shareHolderValitate(Methods.GetAllOfOneType),
  errorHandler,
  getIncomesOfOneOrder
)

export default shareHolderRouter
