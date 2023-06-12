import { body } from 'express-validator'

import { Methods } from '../../types'

const cookieValidate = (method: Methods) => {
  switch (method) {
    case Methods.Add: {
      return [
        body('lang', 'invalid language')
          .isString()
          .custom(async (lang) => {
            if (!['en', 'fa'].includes(lang)) {
              return Promise.reject('invalid language')
            }
          }),
      ]
    }

    default: {
      return []
    }
  }
}

export default cookieValidate
