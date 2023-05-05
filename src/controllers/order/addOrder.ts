import { Request, Response } from 'express'

import orderDB from '../../database/order'
import shareHOlderIncomeDB from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const addOrder = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const { products, ...order } = req.body
    const { orderId, totalProfit } = await orderDB.add(
      { ...order, companyId },
      products
    )
    if (!orderId) {
      res
        .sendStatus(500)
        .send({ error: translateErrorMessage('error happened') })
    }
    await shareHOlderIncomeDB.add(orderId, totalProfit, companyId!)
    res.status(200).send({ orderId })
  } catch (e: any) {
    logger.error(`error happend in add order: ${e}`)
    const errorMessage = 'there is no enough product in stock'
    res.status(500).send({
      error: e.toString().includes(errorMessage)
        ? translateErrorMessage(errorMessage)
        : translateErrorMessage('error happened'),
    })
  }
}

export default addOrder
