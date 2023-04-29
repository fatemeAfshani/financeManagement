import { Request, Response } from 'express'

import orderDB from '../../database/order'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const order = req.body
    const { id } = req.params
    await orderDB.update(order, +id, companyId!)
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
