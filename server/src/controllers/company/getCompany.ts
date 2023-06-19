import { Request, Response } from 'express'
import companyDB from '../../database/company'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const getCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const company = await companyDB.get({ id: companyId })
    if (company?.[0]) {
      res.status(200).send(company?.[0])
    } else {
      res.status(404).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'company not found'
        ),
      })
    }
  } catch (e) {
    logger.error(`error happend in get company: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default getCompany
