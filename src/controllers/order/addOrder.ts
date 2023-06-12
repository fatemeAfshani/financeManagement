import { Request, Response } from 'express'

import orderDB from '../../database/order'
import shareHOlderIncomeDB from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import {
  deleteRedisData,
  deleteUserRedisData,
  translateErrorMessage,
} from '../../utils'

const addOrder = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const { products, ...order } = req.body
    const { orderId, totalProfit } = await orderDB.add(
      { ...order, companyId },
      products
    )
    if (!orderId) {
      res.sendStatus(500).send({
        error: translateErrorMessage(req.cookies?.language, 'error happened'),
      })
    }
    const users = await shareHOlderIncomeDB.add(orderId, totalProfit, companyId)
    await deleteUserRedisData(users)
    await deleteRedisData([
      `company:${companyId}-income`,
      `company:${companyId}-income-notsettled`,
      `company-allusers:${companyId}-income`,
      `company-allusers:${companyId}-income-notsettled`,
      `income-thisweek:${companyId}`,
      `income-lastweek:${companyId}`,
      `income-lastmonth:${companyId}`,
      `orders-thisweek:${companyId}`,
      `orders-lastweek:${companyId}`,
      `orders-lastmonth:${companyId}`,
      `orders-total:${companyId}`,
    ])
    res.status(200).send({ orderId })
  } catch (e: any) {
    logger.error(`error happend in add order: ${e}`)
    const errorMessage = 'there is no enough product in stock'
    res.status(500).send({
      error: e.toString().includes(errorMessage)
        ? translateErrorMessage(req.cookies?.language, e.toString())
        : translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default addOrder
