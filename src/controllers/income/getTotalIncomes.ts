import { Request, Response } from 'express'

import shareHolderIncomeDB, {
  ShareHolderIncomeInput,
} from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'
import redisClient from '../../redis'

export const getTotalIncomesOfAllUsersOfACompany = async (
  req: Request,
  res: Response
) => {
  try {
    const { fromDate, toDate } = req.query
    const { companyId } = req.user as User
    if (!fromDate && !toDate) {
      const response = await redisClient.get(`company:${companyId}-income-all`)
      if (response) return res.status(200).send({ totalIncome: response })
    }
    const totalIncome = (
      await shareHolderIncomeDB.getSum(
        {
          companyId: companyId!,
        },
        fromDate as string,
        toDate as string
      )
    )?.[0]
    if (!fromDate && !toDate) {
      await redisClient.set(
        `company:${companyId}-income-all`,
        totalIncome.sum,
        {
          EX: 60 * 60 * 24,
        }
      )
    }
    res.status(200).send({ totalIncome: totalIncome.sum ?? '0' })
  } catch (e: any) {
    logger.error(
      `error happend in get total incomes of all users of a company: ${e}`
    )
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getTotalIncomesOfAUserOrACompany = async (
  req: Request,
  res: Response
) => {
  try {
    const { fromDate, toDate, forUser, onlyNotSettled } = req.query
    const { id, companyId } = req.user as User

    const params: ShareHolderIncomeInput = {}
    let key = ''
    if (forUser === 'true') {
      params.userId = id
      key = `user:${id}-income`
    } else {
      params.companyId = companyId
      params.isCompanyIncome = true
      key = `company:${companyId}-income`
    }
    if (onlyNotSettled === 'true') {
      params.isSettled = false
      key += '-not-settled'
    }

    if (!fromDate && !toDate) {
      const response = await redisClient.get(key)
      if (response) return res.status(200).send({ totalIncome: response })
    }
    const totalIncome = (
      await shareHolderIncomeDB.getSum(
        params,
        fromDate as string,
        toDate as string
      )
    )?.[0]
    if (!fromDate && !toDate) {
      await redisClient.set(key, totalIncome.sum, {
        EX: 60 * 60 * 24,
      })
    }
    res.status(200).send({ totalIncome: totalIncome.sum ?? '0' })
  } catch (e: any) {
    logger.error(`error happend in get total incomes of a user: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
