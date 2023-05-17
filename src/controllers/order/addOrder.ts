import { Request, Response } from 'express'
import redisClient from '../../redis'

import orderDB from '../../database/order'
import shareHOlderIncomeDB from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import { deleteRedisData, translateErrorMessage } from '../../utils'

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
    const users = await shareHOlderIncomeDB.add(
      orderId,
      totalProfit,
      companyId!
    )
    await deleteRedisData(companyId!, users)
    res.status(200).send({ orderId })
  } catch (e: any) {
    logger.error(`error happend in add order: ${e}`)
    const errorMessage = 'there is no enough product in stock'
    res.status(500).send({
      error: e.toString().includes(errorMessage)
        ? translateErrorMessage(req.cookies?.language, errorMessage)
        : translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default addOrder
