import { Request, Response } from 'express'
import moment from 'jalali-moment'

import checkoutDB from '../../database/shareholder-checkout'
import logger from '../../logger'
import { ShareHolderCheckout, User } from '../../types'
import { deleteRedisData, translateErrorMessage } from '../../utils'

const addCheckout = async (req: Request, res: Response) => {
  try {
    const { incomeIds, ...checkoutData } = req.body
    const { companyId } = req.user as User

    const checkout: ShareHolderCheckout = {
      companyId,
      ...checkoutData,
      date: moment().format('jYYjMMjDD'),
    }
    await checkoutDB.add(checkout, incomeIds)
    if (checkoutData?.userId) {
      await deleteRedisData([
        `user-${checkoutData?.userId}-income-notsettled`,
        `company-allusers-${companyId}-income-notsettled`,
      ])
    } else {
      await deleteRedisData([
        `company-${companyId}-income-notsettled
`,
        `company-allusers-${companyId}-income-notsettled`,
      ])
    }
    res.sendStatus(200)
  } catch (e: any) {
    logger.error(`error happend in add checkout: ${e}`)
    res.status(500).send({
      error: e.message
        ? translateErrorMessage(req.cookies?.language, e.message)
        : translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default addCheckout
