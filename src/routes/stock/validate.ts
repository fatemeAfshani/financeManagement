import { param, query } from 'express-validator'

import { Methods } from '../../types'
import productDB from '../../database/product'

const stockValitate = (method: Methods) => {
  switch (method) {
    case Methods.GetAll: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case Methods.GetAllOfOneType: {
      return [
        param('id', 'invalid id')
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
      ]
    }

    default: {
      return []
    }
  }
}

export default stockValitate
