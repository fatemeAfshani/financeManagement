import { Router } from 'express'

import addInvoice from '../../controllers/invoice/addInvoice'
import {
  getInvoice,
  getInvoices,
  getInvoicesOfOneProduct,
} from '../../controllers/invoice/getInvoices'
import { Methods } from '../../types'
import { errorHandler } from '../../utils'
import invoiceValitate from './validate'

const invoiceRouter = Router()

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

invoiceRouter.post('/', invoiceValitate(Methods.Add), errorHandler, addInvoice)

// productRouter.delete(
//   '/:id',
//   productValitate(Methods.Delete),
//   errorHandler,
//   deleteProduct
// )

// productRouter.post(
//   '/:id',
//   productValitate(Methods.Update),
//   errorHandler,
//   updateProduct
// )

export default invoiceRouter
