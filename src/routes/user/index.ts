import { Router } from 'express'
import addOrUpdateShareHolders from '../../controllers/user/addOrUpdateShareHolders'
import getAllUsersOfCompany from '../../controllers/user/getAllUsersOfCompany'

import login from '../../controllers/user/login'
import register from '../../controllers/user/register'
import { Methods } from '../../types'
import {
  hasAdminAccess,
  hasViewerAccess,
  isAuth,
} from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import userValidate from './validator'

const userRouter = Router()

userRouter.post(
  '/register',
  userValidate(Methods.Register),
  errorHandler,
  register
)

userRouter.post('/login', userValidate(Methods.Login), errorHandler, login)

userRouter.get('/company', isAuth, hasAdminAccess, getAllUsersOfCompany)

userRouter.post(
  '/shareholder',
  isAuth,
  hasAdminAccess,
  userValidate(Methods.Add),
  errorHandler,
  addOrUpdateShareHolders
)

export default userRouter
