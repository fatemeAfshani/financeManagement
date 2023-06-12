import { Count, ProductInvoice, ProductStock } from '../../types'
import db from '../db'

type InvoiceInput = {
  id?: number
  productId?: number
  companyId?: number
}

const getAll = (
  limit: number,
  offset: number,
  companyId: number
): Promise<ProductInvoice[]> =>
  db
    .table<ProductInvoice>('product_invoice')
    .select(
      'product_invoice.id as id',
      'product_invoice.amount as amount',
      'date',
      'pricePerOne',
      'productId',
      'name'
    )
    .join('product', 'product.id', 'product_invoice.productId')
    .where({ 'product_invoice.companyId': companyId })
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc')

const getOne = (data: InvoiceInput): Promise<ProductInvoice[]> =>
  db.table<ProductInvoice>('product_invoice').select('*').where(data)

const getAllForOneProduct = (
  data: InvoiceInput,
  limit: number,
  offset: number
): Promise<ProductInvoice[]> =>
  db
    .table<ProductInvoice>('product_invoice')
    .select('*')
    .where(data)
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc')

const add = (invoice: ProductInvoice): Promise<object | undefined | number> =>
  db.transaction((trx) =>
    trx
      .table<ProductInvoice>('product_invoice')
      .insert(invoice)
      .then(() =>
        trx.table<ProductStock>('product_stock').forUpdate().select('*').where({
          productId: invoice.productId,
          buyPrice: invoice.pricePerOne,
        })
      )
      .then((result) => {
        const productInvoice = result?.[0]
        if (productInvoice) {
          return trx
            .table<ProductStock>('product_stock')
            .update({ amount: productInvoice.amount + invoice.amount })
            .where({ id: productInvoice.id })
        }
        return trx.table<ProductStock>('product_stock').insert({
          productId: invoice.productId,
          amount: invoice.amount,
          buyPrice: invoice.pricePerOne,
        })
      })
  )

const count = (companyId: number): Promise<Count[]> =>
  db.table<ProductInvoice>('product_invoice').where({ companyId }).count('*')

const countOfOneProduct = (
  companyId: number,
  productId: number
): Promise<Count[]> =>
  db
    .table<ProductInvoice>('product_invoice')
    .where({ companyId, productId })
    .count('*')

const getSum = (companyId: number): Promise<{ count: string }[]> =>
  db.table<ProductInvoice>('product_invoice').count('*').where({ companyId })
export default {
  getAll,
  getOne,
  add,
  getAllForOneProduct,
  count,
  countOfOneProduct,
  getSum,
}
