import { Company } from '../../types'
import db from '../db'

type companyInput = {
  name?: string
  id?: number
}

const add = (company: Company): Promise<{ id: string }[]> =>
  db.table<Company>('company').insert(company, ['id'])

const get = (params: companyInput): Promise<Company[]> =>
  db.table<Company>('company').select('*').where(params)

export default {
  add,
  get,
}
