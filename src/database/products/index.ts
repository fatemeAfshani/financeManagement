import { Product } from '../../types'
import db from '../db'

type ProductInput = {
  name?: string
  id?: number
}

const getAll = (limit: number, offset: number): Promise<Product[]> =>
  db.table<Product>('product').select('*').limit(limit).offset(offset)

const getOne = (data: ProductInput): Promise<Product[]> => {
  const query = db.table<Product>('product').select('*')
  if (data.id) {
    query.where({ id: data.id })
  } else if (data.name) {
    query.where({ name: data.name })
  }

  return query
}

const add = (product: Product): Promise<object> =>
  db.table<Product>('product').insert(product)

const deleteOne = (id: number): Promise<number> =>
  db.table<Product>('product').where({ id }).del()

const deleteMany = (id: number[]): Promise<object> =>
  db.table<Product>('product').whereIn('name', id).del()

const deleteAll = (): Promise<object> => db.table<Product>('product').del()

export default {
  getAll,
  getOne,
  add,
  deleteOne,
  deleteMany,
  deleteAll,
}
