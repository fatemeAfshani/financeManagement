import { body, param, query } from 'express-validator'

import { Methods, ShareHolderUser } from '../../types'
import userDB from '../../database/user'

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
        query('forUser', 'invalid input').optional().isBoolean(),
      ]
    }

    default: {
      return []
    }
  }
}

export default shareHolderValidate
