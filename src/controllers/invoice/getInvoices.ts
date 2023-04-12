import { Request, Response } from 'express'
import invoiceDB from '../../database/invoice'
import logger from '../../logger'
import { translateErrorMessage } from '../../utils'

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const invoices = await invoiceDB.getAll(+limit, +offset * +limit)
    res.status(200).send(invoices)
  } catch (e) {
    logger.error(`error happend in get invoices: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const invoice = await invoiceDB.getOne({ id: +id })
    if (invoice?.[0]) {
      res.status(200).send(invoice?.[0])
    } else {
      res
        .status(404)
        .send({ error: translateErrorMessage('invoice not found') })
    }
  } catch (e) {
    logger.error(`error happend in get one invoice: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export const getInvoicesOfOneProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const invoices = await invoiceDB.getOne({ productId: +id })
    if (invoices?.[0]) {
      res.status(200).send(invoices)
    } else {
      res.status(404).send({
        error: translateErrorMessage('no invoice found for this product id'),
      })
    }
  } catch (e) {
    logger.error(`error happend in get one invoice: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}
