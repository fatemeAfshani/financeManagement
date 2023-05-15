import { Request, Response } from 'express'

import orderDB from '../../database/order'
import shareholderIncomeDB from '../../database/shareholder-income'
import logger from '../../logger'
import { User } from '../../types'
import { deleteRedisData, translateErrorMessage } from '../../utils'

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
          'incomes of this order is already settled, can not update'
        ),
      })
    }
    const { totalProfit } = await orderDB.update(order, +id, companyId!)
    const users = await shareholderIncomeDB.add(+id, totalProfit, companyId!)
    await deleteRedisData(companyId!, users)

    res.sendStatus(200)
  } catch (e: any) {
    logger.error(`error happend in update order: ${e}`)
    const errorMessage = 'order not found'
    res.status(500).send({
      error: e.toString().includes(errorMessage)
        ? translateErrorMessage(errorMessage)
        : translateErrorMessage('error happened'),
    })
  }
}

export default updateOrder
