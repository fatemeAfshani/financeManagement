import { Router } from 'express'
import addOrUpdateShareHolders from '../../controllers/shareHolder/addOrUpdateShareHolders'
import { Methods } from '../../types'
import { hasAdminAccess, isAuth } from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import shareHolderValitate from './validate'

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

export default shareHolderRouter
