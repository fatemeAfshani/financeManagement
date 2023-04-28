import { OrderProduct } from '../../types'
import db from '../db'

const getOne = (orderId: number): Promise<OrderProduct[]> =>
  db.table<OrderProduct>('order_product').select('*').where({ orderId })

export default {
  getOne,
}
