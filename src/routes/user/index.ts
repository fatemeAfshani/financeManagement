import { Router } from 'express'
import addOrUpdateShareHolders from '../../controllers/user/addOrUpdateShareHolders'
import deleteUser from '../../controllers/user/deleteUser'
import { getAllUsersOfCompany, getUser } from '../../controllers/user/getUsers'

import login from '../../controllers/user/login'
import register from '../../controllers/user/register'
import updateUser from '../../controllers/user/updateUser'
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
userRouter.get(
  '/user/:id',
  isAuth,
  hasViewerAccess,
  userValidate(Methods.GetOne),
  errorHandler,
  getUser
)

userRouter.post(
  '/shareholder',
  isAuth,
  hasAdminAccess,
  userValidate(Methods.Add),
  errorHandler,
  addOrUpdateShareHolders
)

userRouter.post(
  '/update',
  isAuth,
  hasAdminAccess,
  userValidate(Methods.Update),
  errorHandler,
  updateUser
)

userRouter.delete(
  '/:id',
  isAuth,
  hasAdminAccess,
  userValidate(Methods.Delete),
  errorHandler,
  deleteUser
)
export default userRouter
