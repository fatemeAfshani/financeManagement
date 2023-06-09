import { body, param, query } from 'express-validator'

import { Methods, OrderProductInput, SellFrom } from '../../types'
import productDB from '../../database/product'

const orderValitate = (method: Methods) => {
  switch (method) {
    case Methods.Add: {
      return [
        body('name', 'invalid customer name').isString().optional(),
        body('address', 'invalid address').isString().optional(),
        body('phone', 'invalid phone').isString().optional(),
        body('postalCode', 'invalid postal code').isString().optional(),
        body('trackingCode', 'invalid tracking code').isString().optional(),
        body('orderDate', 'invalid order date')
          .isString()
          .isLength({ min: 6, max: 6 })
          .optional(),
        body('shippingDate', 'invalid shipping date')
          .isString()
          .isLength({ min: 6, max: 6 })
          .optional(),
        body(
          'shippingPriceCustomer',
          'invalid shipping price for customer'
        ).isFloat(),
        body(
          'shippingPriceSeller',
          'invalid shipping price for seller'
        ).isFloat(),
        body('discount', 'invalid discount').isFloat().optional(),
        body('sellFrom', 'invalid source of sell')
          .isString()
          .optional()
          .custom(async (sellFrom) => {
            if (sellFrom && !Object.values(SellFrom).includes(sellFrom)) {
              return Promise.reject('invalid source of sell')
            }
          }),

        body('products', 'invalid products').custom(
          async (products, { req }) => {
            await Promise.all(
              products.map(async (product: OrderProductInput) => {
                if (typeof product.productId !== 'number') {
                  return Promise.reject('product not found')
                }
                const dbProduct = await productDB.getOne({
                  id: product.productId,
                  companyId: req.user.companyId,
                })
                if (!dbProduct?.[0]) {
                  return Promise.reject('product not found')
                }
                if (typeof product.amount !== 'number') {
                  return Promise.reject('invalid amount')
                }
                if (typeof product.sellPrice !== 'number') {
                  return Promise.reject('invalid price')
                }
              })
            )
          }
        ),
      ]
    }

    case Methods.GetOne: {
      return [param('id', 'invalid id').isInt()]
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
    case Methods.Update: {
      return [
        param('id', 'invalid id').isInt(),
        body('name', 'invalid customer name').isString().optional(),
        body('address', 'invalid address').isString().optional(),
        body('phone', 'invalid phone').isString().optional(),
        body('postalCode', 'invalid postal code').isString().optional(),
        body('trackingCode', 'invalid tracking code').isString().optional(),
        body('orderDate', 'invalid order date')
          .isString()
          .isLength({ min: 6, max: 6 })
          .optional(),
        body('shippingDate', 'invalid shipping date')
          .isString()
          .isLength({ min: 6, max: 6 })
          .optional(),
        body('shippingPriceCustomer', 'invalid shipping price for customer')
          .isFloat()
          .optional(),
        body('shippingPriceSeller', 'invalid shipping price for seller')
          .isFloat()
          .optional(),
        body('discount', 'invalid discount').isFloat().optional(),
        body('sellFrom', 'invalid source of sell')
          .isString()
          .optional()
          .custom(async (sellFrom) => {
            if (sellFrom && !Object.values(SellFrom).includes(sellFrom)) {
              return Promise.reject('invalid source of sell')
            }
          }),
      ]
    }
    default: {
      return []
    }
  }
}

export default orderValitate
