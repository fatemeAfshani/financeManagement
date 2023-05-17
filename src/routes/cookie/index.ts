import { Router } from 'express'
import addCookie from '../../controllers/cookie/addCookie'

import { Methods } from '../../types'
import errorHandler from '../../utils/middlewares/errorHandler'
import cookieValidate from './validate'

const cookieRouter = Router()

cookieRouter.post('/', cookieValidate(Methods.Add), errorHandler, addCookie)

export default cookieRouter
