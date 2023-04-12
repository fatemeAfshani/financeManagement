import { body } from 'express-validator'

import { Methods, Roles } from '../../types'
import userDB from '../../database/user'
import companyDB from '../../database/company'

const userValidate = (method: Methods) => {
  switch (method) {
    case Methods.Register: {
      return [
        body('username', 'invalid username')
          .isString()
          .notEmpty()
          .custom(async (username) => {
            const user = (await userDB.get({ username }))?.[0]
            if (user) {
              return Promise.reject('customer already exist with this username')
            }
          }),
        body('password', 'invalid password')
          .isString()
          .isLength({ min: 6 })
          .notEmpty(),
        body('companyId', 'invalid company')
          .isInt()
          .optional()
          .custom(async (companyId) => {
            const company = (await companyDB.get({ id: companyId }))?.[0]
            if (!company) {
              return Promise.reject('company not found')
            }
          }),
        body('companyName', 'invalid company name')
          .isString()
          .optional()
          .notEmpty()
          .custom(async (companyName) => {
            const company = (await companyDB.get({ name: companyName }))?.[0]
            if (company) {
              return Promise.reject('company already exist with this name')
            }
          }),
        body('role', 'invalid role')
          .isString()
          .notEmpty()
          .custom(async (role) => {
            if (!Object.values(Roles).includes(role)) {
              return Promise.reject('invalid role')
            }
          }),
      ]
    }
    case Methods.Login: {
      return [
        body('username', 'invalid username').isString().notEmpty(),
        body('password', 'invalid password').isString().notEmpty(),
      ]
    }

    default: {
      return []
    }
  }
}

export default userValidate
