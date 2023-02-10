import { Router } from 'express'

import addProduct from '../../controllers/product/addProduct'
import deleteProduct from '../../controllers/product/deleteProduct'
import { getProduct, getProducts } from '../../controllers/product/getProducts'
import updateProduct from '../../controllers/product/updateProduct'
import { Methods } from '../../types'
import { errorHandler } from '../../utils'
import productValitate from './validate'

const productRouter = Router()

productRouter.get(
  '/',
  productValitate(Methods.GetAll),
  errorHandler,
  getProducts
)

productRouter.get(
  '/:id',
  productValitate(Methods.GetOne),
  errorHandler,
  getProduct
)

productRouter.post('/', productValitate(Methods.Add), errorHandler, addProduct)

productRouter.delete(
  '/:id',
  productValitate(Methods.Delete),
  errorHandler,
  deleteProduct
)

productRouter.post(
  '/:id',
  productValitate(Methods.Update),
  errorHandler,
  updateProduct
)

export default productRouter
