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
}
