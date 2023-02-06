import { body, param, query } from 'express-validator'

import { ProductMethod } from '../../types'
import productDB from '../../database/products'

const productValitate = (method: ProductMethod) => {
  switch (method) {
    case ProductMethod.Add: {
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
    case ProductMethod.GetAll: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case ProductMethod.GetOne: {
      return [param('id', 'invalid product id').isInt()]
    }

    case ProductMethod.Delete: {
      return [param('id', 'invalid product id').isInt()]
    }
    default: {
      return []
    }
  }
}

export default productValitate
