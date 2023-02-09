import { Router } from 'express'

import addProduct from '../../controllers/product/addProduct'
import deleteProduct from '../../controllers/product/deleteProduct'
import { getProduct, getProducts } from '../../controllers/product/getProducts'
import updateProduct from '../../controllers/product/updateProduct'
import { ProductMethod } from '../../types'
import { errorHandler } from '../../utils'
import productValitate from './validate'

const productRouter = Router()

productRouter.get(
  '/',
  productValitate(ProductMethod.GetAll),
  errorHandler,
  getProducts
)

productRouter.get(
  '/:id',
  productValitate(ProductMethod.GetOne),
  errorHandler,
  getProduct
)

productRouter.post(
  '/',
  productValitate(ProductMethod.Add),
  errorHandler,
  addProduct
)

productRouter.delete(
  '/:id',
  productValitate(ProductMethod.Delete),
  errorHandler,
  deleteProduct
)

productRouter.post(
  '/:id',
  productValitate(ProductMethod.Update),
  errorHandler,
  updateProduct
)

export default productRouter
