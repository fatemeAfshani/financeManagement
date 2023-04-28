import { Request, Response } from 'express'
import orderDB from '../../database/order'
import orderProductDB from '../../database/order-product'
import invoiceDB from '../../database/product-invoice'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { companyId } = req.user as User
    const invoices = await invoiceDB.getAll(
      +limit,
      +offset * +limit,
      companyId!
    )
    res.status(200).send(invoices)
  } catch (e) {
    logger.error(`error happend in get invoices: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User
    const order = (await orderDB.getOne({ id: +id, companyId }))?.[0]
    if (!order) {
      res.status(404).send({ error: translateErrorMessage('order not found') })
    }
    const orderProducts = await orderProductDB.getOne(+id)
    if (orderProducts) order.products = orderProducts
    res.status(200).send(order)
  } catch (e) {
    logger.error(`error happend in get one order: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}
