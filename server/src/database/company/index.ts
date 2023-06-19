import { Company } from '../../types'
import db from '../db'

type companyInput = {
  name?: string
  id?: number
  uuid?: string
}

const add = (company: Company): Promise<{ id: number }[]> =>
  db.table<Company>('company').insert(company, ['id'])

const get = (params: companyInput): Promise<Company[]> =>
  db.table<Company>('company').select('*').where(params)

export default {
  add,
  get,
}
