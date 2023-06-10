import { Request, Response } from 'express'

import userDB from '../../database/user'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const addOrUpdateShareHolders = async (req: Request, res: Response) => {
  try {
    const { users } = req.body
    const { companyId } = req.user as User

    await userDB.updateShareHolders(users, companyId!)
    res.sendStatus(200)
  } catch (e: any) {
    logger.error(`error happend in add or update shareHolders: ${e}`)
    res.status(500).send({
      error: e.message
        ? translateErrorMessage(req.cookies?.language, e.message)
        : translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default addOrUpdateShareHolders
