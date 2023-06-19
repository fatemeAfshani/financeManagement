import { Request, Response } from 'express'

import orderDB from '../../database/order'
import shareholderIncomeDB from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import {
  deleteRedisData,
  deleteUserRedisData,
  translateErrorMessage,
} from '../../utils'

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const order = req.body
    const { id } = req.params
    const orderIncomes = await shareholderIncomeDB.get({
      orderId: +id,
      isSettled: true,
    })
    if (orderIncomes && orderIncomes.length > 0) {
      return res.status(500).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'incomes of this order are already settled, can not update'
        ),
      })
    }
    const { totalProfit } = await orderDB.update(order, +id, companyId)
    const users = await shareholderIncomeDB.add(+id, totalProfit, companyId)
    await deleteUserRedisData(users)
    await deleteRedisData([
      `company:${companyId}-income`,
      `company:${companyId}-income-notsettled`,
      `company-allusers:${companyId}-income`,
      `company-allusers:${companyId}-income-notsettled`,
    ])

    res.sendStatus(200)
  } catch (e: any) {
    logger.error(`error happend in update order: ${e}`)
    const errorMessage = 'order not found'
    res.status(500).send({
      error: e.toString().includes(errorMessage)
        ? translateErrorMessage(req.cookies?.language, errorMessage)
        : translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default updateOrder
