import { Request, Response } from 'express'
import orderDB from '../../database/order'
import orderProductDB from '../../database/order-product'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { companyId } = req.user as User
    const orders = await orderDB.getAll(+limit, +offset * +limit, companyId!)
    const orderIds = orders.map((order) => order.id!)
    const orderProducts = await orderProductDB.getAll(orderIds)
    orders.forEach((order) => {
      // eslint-disable-next-line no-param-reassign
      order.products = orderProducts.filter(
        (product) => product.orderId === order.id
      )
    })
    res.status(200).send(orders)
  } catch (e) {
    logger.error(`error happend in get invoices: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User
    const order = (await orderDB.getOne({ id: +id, companyId }))?.[0]
    if (!order) {
      res.status(404).send({
        error: translateErrorMessage(req.cookies?.language, 'order not found'),
      })
    }
    const orderProducts = await orderProductDB.getOne(+id)
    if (orderProducts) order.products = orderProducts
    res.status(200).send(order)
  } catch (e) {
    logger.error(`error happend in get one order: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getOrdersOfOneProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { limit = '10', offset = '0' } = req.query

    const { companyId } = req.user as User
    const productOrders = await orderProductDB.getAllForOneProduct(+id)
    const orderIds = productOrders.map((productOrder) => productOrder.orderId!)
    const orders = await orderDB.getAllWithArrayInput(
      +limit,
      +limit * +offset,
      orderIds,
      companyId
    )
    orders.forEach((order) => {
      // eslint-disable-next-line no-param-reassign
      order.products = productOrders.filter(
        (product) => product.orderId === order.id
      )
    })
    res.status(200).send(orders)
  } catch (e) {
    logger.error(`error happend in get one invoice: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
