import { body, param, query } from 'express-validator'

import { Methods } from '../../types'
import productDB from '../../database/product'

const invoiceValitate = (method: Methods) => {
  switch (method) {
    case Methods.Add: {
      return [
        body('productId', 'invalid product id')
          .isInt()
          .custom(async (productId, { req }) => {
            const product = await productDB.getOne({
              id: productId,
              companyId: req.user.companyId,
            })
            if (!product?.[0]) {
              return Promise.reject('product not found')
            }
          }),
        body('pricePerOne', 'invalid price').isFloat(),
        body('amount', 'invalid amount').isInt(),
      ]
    }
    case Methods.GetAll: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case Methods.GetAllOfOneType: {
      return [
        param('id', 'invalid id').isInt(),
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case Methods.GetOne: {
      return [param('id', 'invalid id').isInt()]
    }

    default: {
      return []
    }
  }
}

export default invoiceValitate
