import { ShareHolderIncome, ShareHolderCheckout } from '../../types'
import db from '../db'

const add = async (
  checkout: ShareHolderCheckout,
  incomeIds: number[]
): Promise<void> =>
  db.transaction(async (trx) => {
    const incomes = await trx
      .table<ShareHolderIncome>('shareholder_income')
      .select('*')
      .forUpdate()
      .whereIn('id', incomeIds)

    if (incomes.length !== incomeIds.length) {
      throw new Error('data not found')
    }

    let totalIncome = 0
    incomes.forEach((income) => {
      if (
        (checkout.userId && income.userId !== checkout.userId) ||
        income.companyId !== checkout.companyId ||
        (!checkout.userId && !income.isCompanyIncome)
      ) {
        throw new Error('invalid input')
      }
      if (income.isSettled) {
        throw new Error('atleast one of incomes is already settled')
      }
      totalIncome += +income.amount
    })

    if (totalIncome !== checkout.amount) {
      throw new Error('invalid checkout amount')
    }

    const savedCheckout = await trx
      .table<ShareHolderCheckout>('shareholder_checkout')
      .insert(checkout, 'id')

    const checkoutId = savedCheckout?.[0]?.id
    await trx
      .table<ShareHolderIncome>('shareholder_income')
      .update({
        isSettled: true,
        checkoutId,
      })
      .whereIn('id', incomeIds)
  })

export default {
  add,
}
