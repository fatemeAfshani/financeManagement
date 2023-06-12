import { Request, Response } from 'express'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'
import redisClient from '../../redis'
import shareHolderIncomeDB from '../../database/shareholder-income'
import orderDB from '../../database/order'
import productDB from '../../database/product'
import userDB from '../../database/user'
import invoiceDB from '../../database/product-invoice'

/* redis data
user:{id}-income-notsettled
user:{id}-income

company:{companyId}-income-notsettled
company:{companyId}-income

company-allusers:{companyId}-income-notsettled
company-allusers:{companyId}-income

products-total:{companyId}
orders-total:{companyId}
invoices-total:{companyId}
users-total:{companyId}
*/

export const getUserTotal = async (req: Request, res: Response) => {
  try {
    const { id, companyId } = req.user as User

    let totalIncome = 0
    let totalIncomeNotSettled = 0

    const response = await redisClient.get(`user:${id}-income`)
    if (response) {
      totalIncome = +response
    } else {
      const result = (
        await shareHolderIncomeDB.getSum({ companyId, userId: id })
      )?.[0]

      totalIncome = +result.sum
      await redisClient.set(`user:${id}-income`, totalIncome, {
        EX: 60 * 60 * 24,
      })
    }

    const response2 = await redisClient.get(`user:${id}-income-notsettled`)
    if (response2) {
      totalIncomeNotSettled = +response2
    } else {
      const result2 = (
        await shareHolderIncomeDB.getSum({
          companyId,
          userId: id,
          isSettled: false,
        })
      )?.[0]

      totalIncomeNotSettled = +result2.sum
      await redisClient.set(
        `user:${id}-income-notsettled`,
        totalIncomeNotSettled,
        {
          EX: 60 * 60 * 24,
        }
      )
    }

    res.status(200).send({ totalIncome, totalIncomeNotSettled })
  } catch (e: any) {
    logger.error(`error happend in get total incomes of a user: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getCompanyTotal = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User

    let totalIncome = 0
    let totalIncomeNotSettled = 0
    let companyTotalIncome = 0
    let companyTotalIncomeNotSettled = 0

    const response = await redisClient.get(
      `company-allusers:${companyId}-income`
    )
    if (response) {
      totalIncome = +response
    } else {
      const result = (await shareHolderIncomeDB.getSum({ companyId }))?.[0]

      totalIncome = +result.sum
      await redisClient.set(
        `company-allusers:${companyId}-income`,
        totalIncome,
        {
          EX: 60 * 60 * 24,
        }
      )
    }

    const response2 = await redisClient.get(
      `company-allusers:${companyId}-income-notsettled`
    )
    if (response2) {
      totalIncomeNotSettled = +response2
    } else {
      const result2 = (
        await shareHolderIncomeDB.getSum({
          companyId,
          isSettled: false,
        })
      )?.[0]

      totalIncomeNotSettled = +result2.sum
      await redisClient.set(
        `company-allusers:${companyId}-income-notsettled`,
        totalIncomeNotSettled,
        {
          EX: 60 * 60 * 24,
        }
      )
    }

    const response3 = await redisClient.get(`company:${companyId}-income`)
    if (response3) {
      companyTotalIncome = +response3
    } else {
      const result = (
        await shareHolderIncomeDB.getSum({ companyId, isCompanyIncome: true })
      )?.[0]

      companyTotalIncome = +result.sum
      await redisClient.set(`company:${companyId}-income`, companyTotalIncome, {
        EX: 60 * 60 * 24,
      })
    }

    const response4 = await redisClient.get(
      `company:${companyId}-income-notsettled`
    )
    if (response4) {
      companyTotalIncomeNotSettled = +response4
    } else {
      const result2 = (
        await shareHolderIncomeDB.getSum({
          companyId,
          isSettled: false,
          isCompanyIncome: true,
        })
      )?.[0]

      companyTotalIncomeNotSettled = +result2.sum
      await redisClient.set(
        `company:${companyId}-income-notsettled`,
        companyTotalIncomeNotSettled,
        {
          EX: 60 * 60 * 24,
        }
      )
    }

    res.status(200).send({
      totalIncome,
      totalIncomeNotSettled,
      companyTotalIncome,
      companyTotalIncomeNotSettled,
    })
  } catch (e: any) {
    logger.error(`error happend in get total incomes of a company: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getTotalNumbers = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User

    let totalProducts = 0
    let totalOrders = 0
    let totalUsers = 0
    let totalInvoices = 0

    // products
    const productResponse = await redisClient.get(`products-total:${companyId}`)
    if (productResponse) {
      totalProducts = +productResponse
    } else {
      const productResult = (await productDB.getSum(companyId))?.[0]
      totalProducts = +productResult.count
      await redisClient.set(`products-total:${companyId}`, totalProducts, {
        EX: 60 * 60 * 24,
      })
    }

    // orders
    const orderResponse = await redisClient.get(`orders-total:${companyId}`)

    if (orderResponse) {
      totalOrders = +orderResponse
    } else {
      const orderResult = (await orderDB.getSum({ companyId }))?.[0]

      totalOrders = +orderResult.count
      await redisClient.set(`orders-total:${companyId}`, totalOrders, {
        EX: 60 * 60 * 24,
      })
    }

    // users
    const userResponse = await redisClient.get(`users-total:${companyId}`)

    if (userResponse) {
      totalUsers = +userResponse
    } else {
      const userResult = (await userDB.getSum(companyId))?.[0]

      totalUsers = +userResult.count
      await redisClient.set(`users-total:${companyId}`, totalUsers, {
        EX: 60 * 60 * 24,
      })
    }

    // invoices
    const invoiceResponse = await redisClient.get(`invoices-total:${companyId}`)

    if (invoiceResponse) {
      totalInvoices = +invoiceResponse
    } else {
      const invoiceResult = (await invoiceDB.getSum(companyId))?.[0]

      totalInvoices = +invoiceResult.count
      await redisClient.set(`invoices-total:${companyId}`, totalInvoices, {
        EX: 60 * 60 * 24,
      })
    }
    res
      .status(200)
      .send({ totalProducts, totalOrders, totalUsers, totalInvoices })
  } catch (e: any) {
    logger.error(`error happend in get total numbers: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
