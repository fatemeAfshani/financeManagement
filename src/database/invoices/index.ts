import { Invoice } from '../../types'
import db from '../db'

type InvoiceInput = {
  id?: number
  productId?: number
}

const getAll = (limit: number, offset: number): Promise<Invoice[]> =>
  db.table<Invoice>('product_invoice').select('*').limit(limit).offset(offset)

const getOne = (data: InvoiceInput): Promise<Invoice[]> => {
  const query = db.table<Invoice>('product_invoice').select('*')
  if (data.id) {
    query.where({ id: data.id })
  } else if (data.productId) {
    query.where({ productId: data.productId })
  }

  return query
}

const add = (invoice: Invoice): Promise<object | undefined> =>
  db.transaction(
    (trx) =>
      trx('product')
        .forUpdate()
        .select('*')
        .where({ id: invoice.productId })
        .then((result) => {
          if (result?.[0]) {
            return trx('product')
              .update({ amount: result[0].amount + invoice.amount })
              .where({ id: invoice.productId })
              .then(() => trx.insert(invoice).into('product_invoice'))
          }
        })
    // eslint-disable-next-line function-paren-newline
  )

export default {
  getAll,
  getOne,
  add,
}
