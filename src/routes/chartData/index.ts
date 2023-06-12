import { Router } from 'express'
import {
  getCompanyTotal,
  getUserTotal,
  getTotalNumbers,
} from '../../controllers/chartData'

import { isAuth, hasViewerAccess } from '../../utils/middlewares/auth'

const chartRouter = Router()

chartRouter.get('/user', isAuth, hasViewerAccess, getUserTotal)
chartRouter.get('/company', isAuth, hasViewerAccess, getCompanyTotal)
chartRouter.get('/total', isAuth, hasViewerAccess, getTotalNumbers)

export default chartRouter
