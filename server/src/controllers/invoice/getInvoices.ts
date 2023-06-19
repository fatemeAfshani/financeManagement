import { Request, Response } from 'express'
import invoiceDB from '../../database/product-invoice'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { companyId } = req.user as User
    const invoices = await invoiceDB.getAll(+limit, +offset * +limit, companyId)
    const invoicesCount = (await invoiceDB.count(companyId))?.[0]
    res.status(200).send({ invoices, invoicesCount: +invoicesCount.count })
  } catch (e) {
    logger.error(`error happend in get invoices: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User
    const invoice = await invoiceDB.getOne({ id: +id, companyId })
    if (invoice?.[0]) {
      res.status(200).send(invoice?.[0])
    } else {
      res.status(404).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'invoice not found'
        ),
      })
    }
  } catch (e) {
    logger.error(`error happend in get one invoice: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getInvoicesOfOneProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { limit = '10', offset = '0' } = req.query

    const { companyId } = req.user as User
    const invoices = await invoiceDB.getAllForOneProduct(
      {
        productId: +id,
        companyId,
      },
      +limit,
      +offset * +limit
    )
    if (invoices.length !== 0) {
      const invoicesCount = (
        await invoiceDB.countOfOneProduct(companyId, +id)
      )?.[0]
      res.status(200).send({ invoices, invoicesCount: +invoicesCount.count })
    } else {
      res.status(404).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'no invoice found for this product'
        ),
      })
    }
  } catch (e) {
    logger.error(`error happend in get one invoice: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
