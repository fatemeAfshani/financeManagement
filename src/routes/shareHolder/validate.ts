import { body, param, query } from 'express-validator'

import { Methods, ShareHolderUser } from '../../types'
import userDB from '../../database/user'

const shareHolderValitate = (method: Methods) => {
  switch (method) {
    case Methods.Add: {
      return [
        body('users', 'invalid users').custom(async (users, { req }) => {
          const DBUsers = await userDB.get({
            companyId: req.user.companyId,
          })
          await Promise.all(
            users.map(async (user: ShareHolderUser) => {
              if (typeof user.id !== 'number') {
                return Promise.reject('user not found')
              }
              const dbUser = DBUsers.find(
                (companyUser) => companyUser.id === user.id
              )

              if (!dbUser) {
                return Promise.reject('user not found')
              }

              if (typeof user.isShareHolder !== 'boolean') {
                return Promise.reject('invalid boolean')
              }
              if (typeof user.sharePercent !== 'number') {
                return Promise.reject('invalid share percent')
              }
            })
          )
        }),
      ]
    }

    case Methods.GetAll: {
      return [
        query('limit', 'invalid limit').optional().isInt(),
        query('offset', 'invalid offset').optional().isInt(),
      ]
    }

    case Methods.GetAllOfOneType: {
      return [param('id', 'invalid id').isInt()]
    }

    default: {
      return []
    }
  }
}

export default shareHolderValitate
