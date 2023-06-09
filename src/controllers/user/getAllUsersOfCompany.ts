import { Request, Response } from 'express'

import UserDB from '../../database/user'
import CompanyDB from '../../database/company'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const getAllUsersOfCompany = async (req: Request, res: Response) => {
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

export default getAllUsersOfCompany
