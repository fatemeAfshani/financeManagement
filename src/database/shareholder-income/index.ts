import moment from 'jalali-moment'
import { Company, Count, DateInput, ShareHolderIncome, User } from '../../types'
import db from '../db'

export type ShareHolderIncomeInput = {
  orderId?: number
  companyId?: number
  userId?: number
  isCompanyIncome?: boolean
  isSettled?: boolean
}

const add = async (
  orderId: number,
  totalProfit: number,
  companyId: number
): Promise<User[]> =>
  db.transaction(async (trx) => {
    const users = await trx
      .table<User>('user')
      .select('*')
      .where({ companyId, isShareHolder: true })
    const company = (
      await trx.table<Company>('company').where({ id: companyId })
    )?.[0]
    const shares = users.map(
      (user): ShareHolderIncome => ({
        companyId,
        userId: user.id,
        sharePercent: user.sharePercent,
        date: moment().format('jYYjMMjDD'),
        orderId,
        amount: (user.sharePercent * totalProfit) / 100,
      })
    )

    shares.push({
      companyId,
      sharePercent: company.sharePercent,
      date: moment().format('jYYjMMjDD'),
      orderId,
      isCompanyIncome: true,
      amount: (company.sharePercent * totalProfit) / 100,
    })
    await trx.table<ShareHolderIncome>('shareholder_income').insert(shares)
    return users
  })

const get = (params: ShareHolderIncomeInput): Promise<ShareHolderIncome[]> =>
  db.table<ShareHolderIncome>('shareholder_income').select('*').where(params)

const getAllWithLimit = (
  params: ShareHolderIncomeInput,
  limit: number,
  offset: number
): Promise<ShareHolderIncome[]> =>
  db
    .table<ShareHolderIncome>('shareholder_income')
    .select('*')
    .where(params)
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc')

const getAll = (ids: number[]): Promise<ShareHolderIncome[]> =>
  db
    .table<ShareHolderIncome>('shareholder_income')
    .select('*')
    .whereIn('id', ids)
    .orderBy('id', 'desc')

const getSum = (params: ShareHolderIncomeInput): Promise<{ sum: number }[]> =>
  db.table<ShareHolderIncome>('shareholder_income').sum('amount').where(params)

const count = (params: ShareHolderIncomeInput): Promise<Count[]> =>
  db.table<ShareHolderIncome>('shareholder_income').where(params).count('*')

export default {
  add,
  getAll,
  getAllWithLimit,
  get,
  getSum,
  count,
}
