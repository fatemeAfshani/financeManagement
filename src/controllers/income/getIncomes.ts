import { Request, Response } from 'express'

import shareHolderIncomeDB from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getIncomesOfOneOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User

    const incomes = await shareHolderIncomeDB.get({
      orderId: +id,
      companyId: companyId!,
    })
    if (incomes.length > 0) {
      return res.status(200).send(incomes)
    }
    res.status(400).send({
      error: translateErrorMessage(req.cookies?.language, 'data not found'),
    })
  } catch (e: any) {
    logger.error(`error happend in get incomes of one order: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
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
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getIncomesOfAUserOrACompany = async (
  req: Request,
  res: Response
) => {
  try {
    const { limit = '10', offset = '0', id } = req.query
    const { companyId } = req.user as User

    const params: {
      userId?: number
      companyId?: number
      isCompanyIncome?: boolean
    } = {}

    if (id) {
      params.userId = id as unknown as number
    } else {
      params.companyId = companyId
      params.isCompanyIncome = true
    }
    const incomes = await shareHolderIncomeDB.getAllWithLimit(
      params,
      +limit,
      +offset * +limit
    )

    if (incomes.length !== 0) {
      const incomesCount = (await shareHolderIncomeDB.count(params))?.[0]
      res.status(200).send({ incomes, incomesCount: +incomesCount.count })
    } else {
      res.status(404).send({
        error: translateErrorMessage(req.cookies?.language, 'no income found'),
      })
    }
  } catch (e: any) {
    logger.error(`error happend in get incomes of a user: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
