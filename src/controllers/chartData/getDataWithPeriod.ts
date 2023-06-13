import { Request, Response } from 'express'
import moment from 'jalali-moment'
import orderDB from '../../database/order'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

function getDates(startDate: string, days: number) {
  const dateArray = [startDate]
  for (let i = 1; i < days; i += 1) {
    const dayAgo = moment(startDate, 'jYYjMMjDD')
      .subtract(i, 'd')
      .format('jYYjMMjDD')
    dateArray.push(dayAgo)
  }
  return dateArray
}

export const getCountOfOrders = async (req: Request, res: Response) => {
  try {
    const { period } = req.query
    const { companyId } = req.user as User
    let dateArray: string[] = []

    if (period === 'thisweek') {
      const startDate = moment().format('jYYjMMjDD')
      dateArray = getDates(startDate, 7)
    } else if (period === 'lastmonth') {
      const startDate = moment().format('jYYjMMjDD')
      dateArray = getDates(startDate, 30)
    } else if (period === 'last3month') {
      const startDate = moment().format('jYYjMMjDD')
      dateArray = getDates(startDate, 90)
    }
    const result = await orderDB.getCountWithDate(dateArray, companyId)
    const orders = dateArray.map((date) => ({
      date,
      count: result.find((resp) => resp.orderDate === date)?.count || '0',
    }))

    res.status(200).send(orders.reverse())
  } catch (e: any) {
    logger.error(`error happend in get orders count on a priod: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getSumOfIncomes = async (req: Request, res: Response) => {
  try {
    const { period } = req.query
    const { companyId } = req.user as User
    let dateArray: string[] = []

    if (period === 'thisweek') {
      const startDate = moment().format('jYYjMMjDD')
      dateArray = getDates(startDate, 7)
    } else if (period === 'lastmonth') {
      const startDate = moment().format('jYYjMMjDD')
      dateArray = getDates(startDate, 30)
    } else if (period === 'last3month') {
      const startDate = moment().format('jYYjMMjDD')
      dateArray = getDates(startDate, 90)
    }
    const result = await orderDB.getSumWithDate(dateArray, companyId)
    const orders = dateArray.map((date) => ({
      date,
      sum: result.find((resp) => resp.orderDate === date)?.sum || '0',
    }))

    res.status(200).send(orders.reverse())
  } catch (e: any) {
    logger.error(`error happend in get orders sum on a priod: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
