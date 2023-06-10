import { Request, Response } from 'express'

import userDB from '../../database/user'
import logger from '../../logger'
import { Roles, User } from '../../types'
import { translateErrorMessage } from '../../utils'

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, role, username } = req.body
    const { companyId, role: requestRole } = req.user as User

    if (requestRole !== Roles.ADMIN) {
      return res.status(403).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'you dont have access to update other users'
        ),
      })
    }
    const result = await userDB.update(id, role, username, companyId!)
    if (result) {
      res.sendStatus(200)
    } else {
      res.status(404).send({
        error: translateErrorMessage(req.cookies?.language, 'user not found'),
      })
    }
  } catch (e: any) {
    logger.error(`error happend in update user: ${e}`)
    res.status(500).send({
      error: e.message
        ? translateErrorMessage(req.cookies?.language, e.message)
        : translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default updateUser
