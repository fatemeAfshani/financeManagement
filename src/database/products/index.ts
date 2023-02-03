import { Product } from '../../types'
import db from '../db'

const getAll = (): Promise<Product[]> =>
  db.table<Product>('product').select('*')

const getOne = (name: string): Promise<Product[]> =>
  db.table<Product>('product').select('*').where({ name })

const add = (product: Product): Promise<object> =>
  db.table<Product>('product').insert(product)

const deleteOne = (name: string): Promise<object> =>
  db.table<Product>('product').where({ name }).del()

const deleteMany = (names: string[]): Promise<object> =>
  db.table<Product>('product').whereIn('name', names).del()

export default {
  getAll,
  getOne,
  add,
  deleteOne,
  deleteMany,
}
