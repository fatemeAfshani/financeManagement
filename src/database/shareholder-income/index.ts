import moment from 'jalali-moment'
import { Company, ShareHolderIncome, User } from '../../types'
import db from '../db'

type ShareHolderIncomeInput = {
  orderId: number
  companyId: number
}

const add = async (
  orderId: number,
  totalProfit: number,
  companyId: number
): Promise<void> =>
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
  })

const getAll = (params: ShareHolderIncomeInput): Promise<ShareHolderIncome[]> =>
  db.table<ShareHolderIncome>('shareholder_income').select('*').where(params)

export default {
  add,
  getAll,
}
