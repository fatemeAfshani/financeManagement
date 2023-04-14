import { ProductInvoice, ProductStock } from '../../types'
import db from '../db'

type StockInput = {
  productId: number
}

const getAll = (
  limit: number,
  offset: number,
  companyId: number
): Promise<ProductStock[]> =>
  db
    .table<ProductStock>('product_stock')
    .select('product_stock.id', 'productId', 'amount', 'buyPrice', 'price')
    .join('product', 'product.id', 'product_stock.productId')
    .where({ companyId })
    .andWhere('amount', '>', 0)
    .limit(limit)
    .offset(offset)

const getAllForOneProduct = (data: StockInput): Promise<ProductStock[]> =>
  db
    .table<ProductStock>('product_stock')
    .select('*')
    .where(data)
    .andWhere('amount', '>', 0)

export default {
  getAll,
  getAllForOneProduct,
}
