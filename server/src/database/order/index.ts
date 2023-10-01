import {
  Count,
  DateInput,
  Order,
  OrderProduct,
  OrderProductInput,
  ProductStock,
  ShareHolderIncome,
} from '../../types'
import db from '../db'

type OrderInput = {
  id?: number
  companyId?: number
}

type OrderUpdateInput = {
  name?: string
  address?: string
  phone?: string
  postalCode?: string
  trackingCode?: string
  orderDate?: string
  shippingDate?: string
  shippingPriceCustomer?: number
  shippingPriceSeller?: number
  discount?: number
  sellFrom?: string
}

const getAllWithArrayInput = (
  limit: number,
  offset: number,
  orderIds: number[],
  companyId?: number
): Promise<Order[]> =>
  db
    .table<Order>('order')
    .select('*')
    .whereIn('id', orderIds)
    .andWhere({ companyId })
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc')

const getAll = (
  limit: number,
  offset: number,
  companyId: number
): Promise<Order[]> =>
  db
    .table<Order>('order')
    .select('*')
    .where({ companyId })
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc')

const getOne = (data: OrderInput): Promise<Order[]> =>
  db
    .table<Order>('order')
    .select('*')
    .where({ ...data })

const getCountWithDate = (
  orderDates: string[],
  companyId: number
): Promise<{ orderDate: string; count: string }[]> =>
  db
    .table<Order>('order')
    .select(db.raw('"orderDate", count(*)'))
    .whereIn('orderDate', orderDates)
    .andWhere({ companyId })
    .groupBy('orderDate')

const getSumWithDate = (
  orderDates: string[],
  companyId: number
): Promise<{ orderDate: string; sum: string }[]> =>
  db
    .table<Order>('order')
    .select(db.raw('"orderDate", sum("totalProfit")'))
    .whereIn('orderDate', orderDates)
    .andWhere({ companyId })
    .groupBy('orderDate')

const update = (
  updatedOrder: OrderUpdateInput,
  id: number,
  companyId: number
): Promise<{ totalProfit: number }> =>
  db.transaction(async (trx) => {
    const res = await trx.table<Order>('order').forUpdate().select('*').where({
      id,
      companyId,
    })
    const order = res?.[0]
    if (!order) throw new Error('order not found')
    let totalProfit = order.totalProfit || 0

    if (updatedOrder.discount !== undefined) {
      totalProfit = +totalProfit + +order.discount - +updatedOrder.discount
    }
    if (
      updatedOrder.shippingPriceCustomer !== undefined ||
      updatedOrder.shippingPriceSeller !== undefined
    ) {
      const pastShippingDifference =
        order.shippingPriceCustomer - order.shippingPriceSeller
      const newShippingDifference =
        (updatedOrder.shippingPriceCustomer || order.shippingPriceCustomer) -
        (updatedOrder.shippingPriceSeller || order.shippingPriceCustomer)
      totalProfit =
        +totalProfit - +pastShippingDifference + +newShippingDifference
    }
    await trx
      .table<Order>('order')
      .update({
        ...updatedOrder,
        totalProfit,
      })
      .where({ id })

    await trx
      .table<ShareHolderIncome>('shareholder_income')
      .where({ orderId: id })
      .del()

    return { totalProfit }
  })

const add = (
  order: Order,
  products: OrderProductInput[]
): Promise<{ orderId: number; totalProfit: number }> => {
  let totalProfit = 0
  return db.transaction(async (trx) => {
    const newOrder = await trx.table<Order>('order').insert(order, ['id'])
    const orderId = newOrder?.[0]?.id

    await Promise.all(
      products.map(async (product) => {
        const res = await trx
          .table<ProductStock>('product_stock')
          .forUpdate()
          .select('*')
          .where({
            productId: product.productId,
          })
          .andWhere('amount', '>', 0)

        let stocksLeft = res.length
        let remainedAmaount = product.amount

        while (remainedAmaount > 0 && stocksLeft > -1) {
          const stock = res?.[stocksLeft - 1]
          if (stock.amount >= remainedAmaount) {
            totalProfit +=
              (product.sellPrice - stock.buyPrice) * remainedAmaount

            await trx.table<OrderProduct>('order_product').insert({
              orderId,
              productId: product.productId,
              sellPrice: product.sellPrice,
              buyPrice: stock.buyPrice,
              amount: remainedAmaount,
            })
            await trx
              .table<ProductStock>('product_stock')
              .update({
                amount: stock.amount - remainedAmaount,
              })
              .where({ id: stock.id })
            return
          } else {
            totalProfit += (product.sellPrice - stock.buyPrice) * stock.amount

            await trx.table<OrderProduct>('order_product').insert({
              orderId,
              productId: product.productId,
              sellPrice: product.sellPrice,
              buyPrice: stock.buyPrice,
              amount: stock.amount,
            })
            await trx
              .table<ProductStock>('product_stock')
              .update({
                amount: 0,
              })
              .where({ id: stock.id })

            stocksLeft -= 1
            remainedAmaount -= stock.amount
          }
        }

        if (remainedAmaount > 0) {
          throw new Error(
            `there is no enough product in stock for ${product.name}`
          )
        }
        return
      })
    )
    const shippingPriceDifference =
      order.shippingPriceCustomer - order.shippingPriceSeller
    totalProfit += shippingPriceDifference

    totalProfit = order.discount ? totalProfit - order.discount : totalProfit

    await trx
      .table<Order>('order')
      .update({ totalProfit })
      .where({ id: orderId })
    return { orderId, totalProfit }
  })
}

const count = (companyId: number): Promise<Count[]> =>
  db.table<Order>('order').where({ companyId }).count('*')

export default {
  getAll,
  getOne,
  add,
  getAllWithArrayInput,
  update,
  count,
  getCountWithDate,
  getSumWithDate,
}
