import { param, query } from 'express-validator'

import userDB from '../../database/user'
import { Methods } from '../../types'

const shareHolderValidate = (method: Methods) => {
  switch (method) {
    case Methods.GetAll: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case Methods.GetAllOfOneType: {
      return [param('id', 'invalid id').isInt()]
    }

    case Methods.GetOne: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
        query('id', 'invalid id')
          .optional()
          .isInt()
          .custom(async (id, { req }) => {
            const user = (await userDB.getAll({ id }))?.[0]
            // only user itself or
            // someOne in the same compnay with admin access can get user's income
            if (
              !user ||
              (user.id !== req.user.id &&
                (req.user.companyId !== user.companyId ||
                  req.user.role !== 'admin'))
            ) {
              return Promise.reject('user not found')
            }
          }),
      ]
    }

    case Methods.GetTotal: {
      return [
        query('fromDate', 'invalid from date')
          .optional()
          .isString()
          .isLength({ min: 6, max: 6 }),

        query('toDate', 'invalid to date')
          .optional()
          .isString()
          .isLength({ min: 6, max: 6 }),
      ]
    }

    case Methods.GetTotalUser: {
      return [
        query('fromDate', 'invalid from date')
          .optional()
          .isString()
          .isLength({ min: 6, max: 6 }),

        query('toDate', 'invalid to date')
          .optional()
          .isString()
          .isLength({ min: 6, max: 6 }),
        query('onlyNotSettled', 'invalid input').optional().isBoolean(),
        query('forUser', 'invalid input').optional().isBoolean(),
      ]
    }
    default: {
      return []
    }
  }
}

export default shareHolderValidate
