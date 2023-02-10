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

const add = (invoice: Invoice): Promise<object> =>
  db.table<Invoice>('product_invoice').insert(invoice)

// const update = (
//   product: Partial<Omit<Product, 'id'>>,
//   id: number
// ): Promise<number> => db.table<Product>('product').update(product).where({ id })

// const deleteOne = (id: number): Promise<number> =>
//   db.table<Product>('product').where({ id }).del()

// const deleteMany = (id: number[]): Promise<object> =>
//   db.table<Product>('product').whereIn('name', id).del()

// const deleteAll = (): Promise<object> => db.table<Product>('product').del()

export default {
  getAll,
  getOne,
  add,
  //   update,
  //   deleteOne,
  //   deleteMany,
  //   deleteAll,
}
