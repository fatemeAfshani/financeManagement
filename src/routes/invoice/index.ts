import { Router } from 'express'

import addInvoice from '../../controllers/invoice/addInvoice'
import {
  getInvoice,
  getInvoices,
  getInvoicesOfOneProduct,
} from '../../controllers/invoice/getInvoices'
import { Methods } from '../../types'
import {
  hasAdminAccess,
  hasViewerAccess,
  isAuth,
} from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import invoiceValitate from './validate'

const invoiceRouter = Router()

// must change
invoiceRouter.get(
  '/',
  isAuth,
  hasViewerAccess,
  invoiceValitate(Methods.GetAll),
  errorHandler,
  getInvoices
)

invoiceRouter.get(
  '/:id',
  isAuth,
  hasViewerAccess,
  invoiceValitate(Methods.GetOne),
  errorHandler,
  getInvoice
)

invoiceRouter.get(
  '/product/:id',
  isAuth,
  hasViewerAccess,
  invoiceValitate(Methods.GetAllOfOneType),
  errorHandler,
  getInvoicesOfOneProduct
)

invoiceRouter.post(
  '/',
  isAuth,
  hasAdminAccess,
  invoiceValitate(Methods.Add),
  errorHandler,
  addInvoice
)

export default invoiceRouter
