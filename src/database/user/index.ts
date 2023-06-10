import { Company, Roles, ShareHolderUser, User } from '../../types'
import db from '../db'

type userInput = {
  username?: string
  id?: number
  companyId?: number
}

const add = (
  user: Omit<User, 'isShareHolder' | 'sharePercent' | 'isDeleted'>
): Promise<object> => db.table<User>('user').insert(user)

const get = (params: userInput): Promise<User[]> =>
  db
    .table<User>('user')
    .select('*')
    .where({ ...params, isDeleted: false })

const getAll = (params: userInput): Promise<User[]> =>
  db
    .table<User>('user')
    .select(
      'username',
      'role',
      'companyId',
      'isShareHolder',
      'sharePercent',
      'id',
      'isDeleted'
    )
    .where({ ...params })

const updateShareHolders = async (
  updatedUsers: ShareHolderUser[],
  companyId: number
): Promise<void> =>
  db.transaction(async (trx) => {
    let totalPercent = 0
    const companyUsers = await trx
      .table<User>('user')
      .forUpdate()
      .select('*')
      .where({
        companyId,
        isDeleted: false,
      })

    companyUsers.forEach((user) => {
      const updatedUser = updatedUsers.find((uUser) => uUser.id === user.id)
      if (updatedUser?.isShareHolder) {
        totalPercent += updatedUser.sharePercent
      } else if (!updatedUser && user.isShareHolder) {
        totalPercent += +user.sharePercent!
      }
    })

    if (totalPercent > 100) throw new Error('total share percents must be 100')
    const companySharePercent = 100 - totalPercent
    await Promise.all(
      updatedUsers.map(async (updateUser) => {
        await trx
          .table<User>('user')
          .update({
            isShareHolder: updateUser.isShareHolder,
            sharePercent: updateUser.isShareHolder
              ? updateUser.sharePercent
              : 0,
          })
          .where({ id: updateUser.id })
      })
    )

    await trx
      .table<Company>('company')
      .update({ sharePercent: companySharePercent })
      .where({ id: companyId })
  })

const update = async (
  id: number,
  role: Roles,
  username: string,
  companyId: number
): Promise<number> =>
  db.table<User>('user').update({ role, username }).where({ id, companyId })

const deleteOne = (id: number, companyId: number): Promise<number> =>
  db.table<User>('user').update({ isDeleted: true }).where({ id, companyId })

export default {
  add,
  get,
  getAll,
  updateShareHolders,
  update,
  deleteOne,
}
