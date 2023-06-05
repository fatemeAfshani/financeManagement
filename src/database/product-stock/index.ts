import { Count, ProductStock } from '../../types'
import db from '../db'

type StockInput = {
  productId: number
}

type AmountOfStock = {
  productId: number
  amount: number
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

const getStockOfAll = (productIds: number[]): Promise<AmountOfStock[]> =>
  db
    .table<ProductStock>('product_stock')
    .select('productId', db.raw('SUM("amount") as amount'))
    .whereIn('productId', productIds)
    .groupBy('productId')

const getAllForOneProduct = (data: StockInput): Promise<ProductStock[]> =>
  db
    .table<ProductStock>('product_stock')
    .select(
      'product_stock.id as id',
      'productId',
      'amount',
      'buyPrice',
      'name',
      'price'
    )
    .join('product', 'product.id', 'product_stock.productId')
    .where(data)

const count = (productId: number): Promise<Count[]> =>
  db.table<ProductStock>('product_stock').where({ productId }).count('*')

export default {
  getAll,
  getAllForOneProduct,
  getStockOfAll,
  count,
}
