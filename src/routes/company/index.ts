import { Router } from 'express'
import getCompany from '../../controllers/company/getCompany'

import { isAuth, hasViewerAccess } from '../../utils/middlewares/auth'

const companyRouter = Router()

companyRouter.get('/', isAuth, hasViewerAccess, getCompany)

export default companyRouter
