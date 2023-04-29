import { Order, OrderProduct, ProductStock } from '../../types'
import db from '../db'

type OrderInput = {
  id?: number
  companyId?: number
}

type OrderProductInput = {
  productId: number
  sellPrice: number
  amount: number
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

const getOne = (data: OrderInput): Promise<Order[]> =>
  db
    .table<Order>('order')
    .select('*')
    .where({ ...data })

const update = (
  updatedOrder: OrderUpdateInput,
  id: number,
  companyId: number
): Promise<number | Order[] | undefined> =>
  db.transaction((trx) =>
    trx
      .table<Order>('order')
      .forUpdate()
      .select('*')
      .where({
        id,
        companyId,
      })
      .then((res) => {
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
            (updatedOrder.shippingPriceCustomer ||
              order.shippingPriceCustomer) -
            (updatedOrder.shippingPriceSeller || order.shippingPriceCustomer)
          totalProfit =
            +totalProfit - +pastShippingDifference + +newShippingDifference
        }
        return trx
          .table<Order>('order')
          .update({
            ...updatedOrder,
            totalProfit,
          })
          .where({ id })
      })
  )

const add = (
  order: Order,
  products: OrderProductInput[]
): Promise<object | void | number> => {
  let orderId: number
  let totalProfit = 0
  return db.transaction((trx) =>
    trx
      .table<Order>('order')
      .insert(order, ['id'])
      .then(async (newOrderId) => {
        orderId = newOrderId?.[0]?.id

        await Promise.all(
          products.map((product) =>
            trx
              .table<ProductStock>('product_stock')
              .forUpdate()
              .select('*')
              .where({
                productId: product.productId,
              })
              .andWhere('amount', '>', 0)
              .then((res) => {
                const invoice = res?.[0]

                if (invoice && invoice.amount >= product.amount) {
                  totalProfit +=
                    (product.sellPrice - invoice.buyPrice) * product.amount
                  return trx
                    .table<OrderProduct>('order_product')
                    .insert({
                      orderId,
                      productId: product.productId,
                      sellPrice: product.sellPrice,
                      buyPrice: invoice.buyPrice,
                      amount: product.amount,
                    })
                    .then(() =>
                      trx
                        .table<ProductStock>('product_stock')
                        .update({
                          amount: invoice.amount - product.amount,
                        })
                        .where({ id: invoice.id })
                    )
                }
                throw new Error('there is no enough product in stock')
              })
          )
        )
        const shippingPriceDifference =
          order.shippingPriceCustomer - order.shippingPriceSeller
        totalProfit += shippingPriceDifference
        totalProfit = order.discount
          ? totalProfit - order.discount
          : totalProfit
        return trx
          .table<Order>('order')
          .update({ totalProfit })
          .where({ id: orderId })
      })
  )
}

export default {
  getAll,
  getOne,
  add,
  getAllWithArrayInput,
  update,
}
