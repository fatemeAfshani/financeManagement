import { query } from 'express-validator'

import { Methods } from '../../types'

const chartValidate = (method: Methods) => {
  switch (method) {
    case Methods.GetAll: {
      return [
        query('period', 'invalid period')
          .isString()
          .notEmpty()
          .custom(async (period) => {
            if (!['thisweek', 'lastmonth', 'last3month'].includes(period)) {
              return Promise.reject('invalid period')
            }
          }),
      ]
    }
    default: {
      return []
    }
  }
}

export default chartValidate
