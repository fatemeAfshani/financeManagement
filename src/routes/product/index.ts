import { Router } from 'express'

import addProduct from '../../controllers/product/addProduct'
import getProducts from '../../controllers/product/getProducts'
import { ProductMethod } from '../../types'
import { errorHandler } from '../../utils'
import productValitate from './validate'

const productRouter = Router()

productRouter.get(
  '/',
  productValitate(ProductMethod.GETALL),
  errorHandler,
  getProducts
)

productRouter.post(
  '/',
  productValitate(ProductMethod.ADD),
  errorHandler,
  addProduct
)

export default productRouter
