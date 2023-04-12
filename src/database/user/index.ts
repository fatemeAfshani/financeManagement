import { User } from '../../types'
import db from '../db'

type userInput = {
  username: string
  id?: number
}

const add = (user: User): Promise<object> => db.table<User>('user').insert(user)

const get = (params: userInput): Promise<User[]> =>
  db.table<User>('user').select('*').where(params)

export default {
  add,
  get,
}
