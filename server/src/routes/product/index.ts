import { Router } from 'express'

import addProduct from '../../controllers/product/addProduct'
import deleteProduct from '../../controllers/product/deleteProduct'
import {
  getProduct,
  getProducts,
  searchProducts,
} from '../../controllers/product/getProducts'
import updateProduct from '../../controllers/product/updateProduct'
import { Methods } from '../../types'
import {
  isAuth,
  hasAdminAccess,
  hasViewerAccess,
} from '../../utils/middlewares/auth'
import errorHandler from '../../utils/middlewares/errorHandler'
import productValitate from './validate'

const productRouter = Router()

productRouter.get(
  '/',
  isAuth,
  hasViewerAccess,
  productValitate(Methods.GetAll),
  errorHandler,
  getProducts
)

productRouter.get(
  '/:id',
  isAuth,
  hasViewerAccess,
  productValitate(Methods.GetOne),
  errorHandler,
  getProduct
)

productRouter.post(
  '/',
  isAuth,
  hasAdminAccess,
  productValitate(Methods.Add),
  errorHandler,
  addProduct
)

productRouter.delete(
  '/:id',
  isAuth,
  hasAdminAccess,
  productValitate(Methods.Delete),
  errorHandler,
  deleteProduct
)

productRouter.post(
  '/:id',
  isAuth,
  hasAdminAccess,
  productValitate(Methods.Update),
  errorHandler,
  updateProduct
)

productRouter.get(
  '/search/name',
  isAuth,
  hasViewerAccess,
  productValitate(Methods.Search),
  errorHandler,
  searchProducts
)
export default productRouter
