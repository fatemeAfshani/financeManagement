import { ProductInvoice, ProductStock } from '../../types'
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
    .select('*')
    .where({ companyId })
    .limit(limit)
    .offset(offset)

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
export default {
  getAll,
  getOne,
  add,
  getAllForOneProduct,
}
