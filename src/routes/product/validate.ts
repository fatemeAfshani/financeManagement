import { body, param, query } from 'express-validator'

import { Methods } from '../../types'
import productDB from '../../database/products'

const productValitate = (method: Methods) => {
  switch (method) {
    case Methods.Add: {
      return [
        body('name', 'invalid name')
          .notEmpty()
          .isString()
          .custom(async (productName) => {
            const product = await productDB.getOne({ name: productName })
            if (product?.[0]) {
              return Promise.reject('product with this name already exist')
            }
          }),
        body('price', 'invalid price').isInt(),
        body('amount', 'invalid amount').isInt(),
      ]
    }
    case Methods.GetAll: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case Methods.GetOne: {
      return [param('id', 'invalid product id').isInt()]
    }

    case Methods.Delete: {
      return [param('id', 'invalid product id').isInt()]
    }
    case Methods.Update: {
      return [
        param('id', 'invalid product id').isInt(),
        body('name', 'invalid name')
          .notEmpty()
          .isString()
          .optional()
          .custom(async (productName) => {
            const product = await productDB.getOne({ name: productName })
            if (product?.[0]) {
              return Promise.reject('product with this name already exist')
            }
          }),
        body('price', 'invalid price').optional().isInt(),
        body('amount', 'invalid amount').optional().isInt(),
      ]
    }
    default: {
      return []
    }
  }
}

export default productValitate
