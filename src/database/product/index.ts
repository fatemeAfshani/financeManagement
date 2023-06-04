import { Product } from '../../types'
import db from '../db'

type ProductInput = {
  name?: string
  id?: number
  companyId?: number
}

type ProductCount = {
  count: string
}

const getAll = (
  limit: number,
  offset: number,
  companyId: number
): Promise<Product[]> =>
  db
    .table<Product>('product')
    .select('*')
    .where({ companyId, isDeleted: false })
    .limit(limit)
    .offset(offset)

const getOne = (data: ProductInput): Promise<Product[]> =>
  db
    .table<Product>('product')
    .select('*')
    .where({ ...data, isDeleted: false })

const add = (product: Product): Promise<object> =>
  db.table<Product>('product').insert(product)

const update = (
  product: Partial<Omit<Product, 'id, companyId, isDeleted'>>,
  id: number
): Promise<number> => db.table<Product>('product').update(product).where({ id })

const deleteOne = (id: number, companyId: number): Promise<number> =>
  db
    .table<Product>('product')
    .update({ isDeleted: true })
    .where({ id, companyId })

const count = (companyId: number): Promise<ProductCount[]> =>
  db.table<Product>('product').where({ companyId, isDeleted: false }).count('*')

const deleteAll = (): Promise<object> => db.table<Product>('product').del()

export default {
  getAll,
  getOne,
  add,
  update,
  deleteOne,
  deleteAll,
  count,
}
