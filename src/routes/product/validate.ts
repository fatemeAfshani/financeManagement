import { body, param, query } from 'express-validator'

import { Methods } from '../../types'
import productDB from '../../database/product'

const productValitate = (method: Methods) => {
  switch (method) {
    case Methods.Add: {
      return [
        body('name', 'invalid name')
          .notEmpty()
          .isString()
          .custom(async (productName, { req }) => {
            const product = await productDB.getOne({
              name: productName,
              companyId: req.user.companyId,
            })
            if (product?.[0]) {
              return Promise.reject('product with this name already exist')
            }
          }),
        body('price', 'invalid price').isFloat(),
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
          .custom(async (productName, { req }) => {
            const product = await productDB.getOne({
              name: productName,
              companyId: req.user.companyId,
            })
            if (product?.[0]) {
              return Promise.reject('product with this name already exist')
            }
          }),
        body('price', 'invalid price').optional().isFloat(),
      ]
    }
    default: {
      return []
    }
  }
}

export default productValitate
