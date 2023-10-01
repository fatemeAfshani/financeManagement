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
    .select('product_stock.id as id', 'productId', 'amount', 'buyPrice', 'name')
    .join('product', 'product.id', 'product_stock.productId')
    .where({ companyId })
    .andWhere('amount', '>', 0)
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc')

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
    .andWhere('amount', '>', 0)

const count = (companyId: number): Promise<Count[]> =>
  db
    .table<ProductStock>('product_stock')
    .join('product', 'product.id', 'product_stock.productId')
    .where({ companyId })
    .andWhere('amount', '>', 0)
    .count('*')

export default {
  getAll,
  getAllForOneProduct,
  getStockOfAll,
  count,
}
