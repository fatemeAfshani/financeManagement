import { Request, Response } from 'express'

import orderDB from '../../database/order'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const addOrder = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const { products, ...order } = req.body
    await orderDB.add({ ...order, companyId }, products)
    res.sendStatus(200)
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
