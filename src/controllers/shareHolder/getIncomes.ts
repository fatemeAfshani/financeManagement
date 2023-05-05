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
      error: translateErrorMessage('error happened'),
    })
  }
}

export const getIncomesOfAllUsersOfACompany = async (
  req: Request,
  res: Response
) => {
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
      error: translateErrorMessage('error happened'),
    })
  }
}

export const getIncomesOfAUserOrACompany = async (
  req: Request,
  res: Response
) => {
  try {
    const { limit = '10', offset = '0', forUser } = req.query
    const { id, companyId } = req.user as User

    const params: {
      userId?: number
      companyId?: number
      isCompanyIncome?: boolean
    } = {}

    if (forUser === 'true') {
      params.userId = id
    } else {
      params.companyId = companyId
      params.isCompanyIncome = true
    }
    const incomes = await shareHolderIncomeDB.getAllWithLimit(
      params,
      +limit,
      +offset * +limit
    )
    res.status(200).send(incomes)
  } catch (e: any) {
    logger.error(`error happend in get incomes of a user: ${e}`)
    res.status(500).send({
      error: translateErrorMessage('error happened'),
    })
  }
}
