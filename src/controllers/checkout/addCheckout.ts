import { Request, Response } from 'express'
import moment from 'jalali-moment'

import checkoutDB from '../../database/shareholder-checkout'
import logger from '../../logger'
import { ShareHolderCheckout, User } from '../../types'
import { translateErrorMessage } from '../../utils'

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
