import { Request, Response } from 'express'

import UserDB from '../../database/user'
import CompanyDB from '../../database/company'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getAllUsersOfCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const users = await UserDB.getAll({ companyId })
    const company = (await CompanyDB.get({ id: companyId }))?.[0]

    res.status(200).send({ users, company })
  } catch (error) {
    logger.error(`error happend in getting all users of a company ${error}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    const { companyId, id: userId } = req.user as User
    const searchId = id || userId
    const user = await UserDB.getAll({ id: +searchId!, companyId })
    if (user?.[0]) {
      res.status(200).send(user?.[0])
    } else {
      res.status(404).send({
        error: translateErrorMessage(req.cookies?.language, 'user not found'),
      })
    }
  } catch (e) {
    logger.error(`error happend in get one User: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
