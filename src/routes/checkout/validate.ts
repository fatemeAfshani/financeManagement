import { body, param, query } from 'express-validator'

import { Methods, ShareHolderUser } from '../../types'
import userDB from '../../database/user'
import shareholderIncomeDB from '../../database/shareholder-income'

const checkoutValitate = (method: Methods) => {
  switch (method) {
    case Methods.Add: {
      return [
        body('userId', 'user not found')
          .optional()
          .isInt()
          .custom(async (userId, { req }) => {
            const user = await userDB.get({
              id: userId,
              companyId: req.user.companyId,
            })
            if (!user?.[0]) {
              return Promise.reject('user not found')
            }
          }),
        body('amount', 'invalid checkout amount').isFloat(),
        body('description', 'invalid description').optional().isString(),
        body('incomeIds', 'invalid input')
          .isArray()
          .custom(async (incomeIds, { req }) => {
            if (!incomeIds.every((income: any) => typeof income === 'number')) {
              return Promise.reject('invalid input')
            }
          }),
      ]
    }

    case Methods.GetAll: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case Methods.GetOne: {
      return [param('id', 'invalid id').isInt()]
    }

    case Methods.GetAllOfOneType: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
        param('id', 'invalid id').isInt(),
      ]
    }
    default: {
      return []
    }
  }
}

export default checkoutValitate
