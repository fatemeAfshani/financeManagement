import { OrderProduct } from '../../types'
import db from '../db'

const getOne = (orderId: number): Promise<OrderProduct[]> =>
  db.table<OrderProduct>('order_product').select('*').where({ orderId })

const getAll = (orderIds: number[]): Promise<OrderProduct[]> =>
  db
    .table<OrderProduct>('order_product')
    .select('*')
    .whereIn('orderId', orderIds)

const getAllForOneProduct = (productId: number): Promise<OrderProduct[]> =>
  db.table<OrderProduct>('order_product').select('*').where({ productId })

export default {
  getOne,
  getAll,
  getAllForOneProduct,
}
