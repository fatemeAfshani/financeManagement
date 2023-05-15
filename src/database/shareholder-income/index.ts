import moment from 'jalali-moment'
import { Company, ShareHolderIncome, User } from '../../types'
import db from '../db'

export type ShareHolderIncomeInput = {
  orderId?: number
  companyId?: number
  userId?: number
  isCompanyIncome?: boolean
  isSettled?: boolean
}

type DateInput = string | undefined

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

const getAll = (ids: number[]): Promise<ShareHolderIncome[]> =>
  db
    .table<ShareHolderIncome>('shareholder_income')
    .select('*')
    .whereIn('id', ids)

const getSum = (
  params: ShareHolderIncomeInput,
  fromDate: DateInput,
  toDate: DateInput
): Promise<{ sum: number }[]> => {
  const query = db
    .table<ShareHolderIncome>('shareholder_income')
    .sum('amount')
    .where(params)
  if (fromDate) {
    query.andWhere('date', '>=', fromDate)
  }
  if (toDate) {
    query.andWhere('date', '<=', toDate)
  }
  return query
}

export default {
  add,
  getAll,
  getAllWithLimit,
  get,
  getSum,
}
