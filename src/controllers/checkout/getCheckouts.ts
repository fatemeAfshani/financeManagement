import { Request, Response } from 'express'

import shareHolderCheckoutDB from '../../database/shareholder-checkout'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getCheckoutsOfACompany = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { companyId } = req.user as User
    const checkouts = await shareHolderCheckoutDB.getAllWithLimit(
      { companyId: companyId! },
      +limit,
      +offset * +limit
    )
    res.status(200).send(checkouts)
  } catch (e: any) {
    logger.error(`error happend in get checkouts of a company: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getCheckoutsOfAUser = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { id } = req.params
    const { companyId } = req.user as User

    const checkouts = await shareHolderCheckoutDB.getAllWithLimit(
      { userId: +id, companyId },
      +limit,
      +offset * +limit
    )
    res.status(200).send(checkouts)
  } catch (e: any) {
    logger.error(`error happend in get checkouts of a user: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getACheckout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User
    const checkout = (
      await shareHolderCheckoutDB.get({
        companyId: companyId!,
        id: +id,
      })
    )?.[0]

    if (!checkout) {
      res.status(404).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'checkout not found'
        ),
      })
    }

    res.status(200).send(checkout)
  } catch (e: any) {
    logger.error(`error happend in get checkouts of a company: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
