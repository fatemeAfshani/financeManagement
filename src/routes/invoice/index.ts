import { Router } from 'express'

import addInvoice from '../../controllers/invoice/addInvoice'
import {
  getInvoice,
  getInvoices,
  getInvoicesOfOneProduct,
} from '../../controllers/invoice/getInvoices'
import { Methods } from '../../types'
import errorHandler from '../../utils/middlewares/errorHandler'
import invoiceValitate from './validate'

const invoiceRouter = Router()

// must change
invoiceRouter.get(
  '/',
  invoiceValitate(Methods.GetAll),
  errorHandler,
  getInvoices
)

invoiceRouter.get(
  '/:id',
  invoiceValitate(Methods.GetOne),
  errorHandler,
  getInvoice
)

invoiceRouter.get(
  '/product/:id',
  invoiceValitate(Methods.GetOne),
  errorHandler,
  getInvoicesOfOneProduct
)
// must change
invoiceRouter.post('/', invoiceValitate(Methods.Add), errorHandler, addInvoice)

export default invoiceRouter
