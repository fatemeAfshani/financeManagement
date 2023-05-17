import { Request, Response } from 'express'

import UserDB from '../../database/user'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const getAllUsersOfCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const users = await UserDB.get({ companyId })
    res.status(200).send({ users })
  } catch (error) {
    logger.error(`error happend in getting all users of a company ${error}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default getAllUsersOfCompany
