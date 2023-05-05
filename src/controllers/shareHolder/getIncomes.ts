import { Request, Response } from 'express'

import shareHolderIncomeDB from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getIncomesOfOneOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User

    const incomes = await shareHolderIncomeDB.getAll({
      orderId: +id,
      companyId: companyId!,
    })
    if (incomes.length > 0) {
      return res.status(200).send(incomes)
    }
    res.status(400).send({ error: translateErrorMessage('no data found') })
  } catch (e: any) {
    logger.error(`error happend in get incomes of one order: ${e}`)
    res.status(500).send({
      error: e.message
        ? translateErrorMessage(e.message)
        : translateErrorMessage('error happened'),
    })
  }
}

export const getIncomesOfACompany = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { companyId } = req.user as User
    const incomes = await shareHolderIncomeDB.getAllWithLimit(
      { companyId: companyId! },
      +limit,
      +offset * +limit
    )
    res.status(200).send(incomes)
  } catch (e: any) {
    logger.error(`error happend in get incomes of all users of a company: ${e}`)
    res.status(500).send({
      error: e.message
        ? translateErrorMessage(e.message)
        : translateErrorMessage('error happened'),
    })
  }
}
