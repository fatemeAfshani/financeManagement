import { Request, Response } from 'express'
import moment from 'jalali-moment'

import invoiceDB from '../../database/product-invoice'
import logger from '../../logger'
import { User } from '../../types'
import { deleteRedisData, translateErrorMessage } from '../../utils'

const addInvoice = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const data = {
      ...req.body,
      date: moment().format('jYYYY/jMM/jDD HH:mm:ss'),
      companyId,
    }
    await invoiceDB.add(data)
    await deleteRedisData([`invoices-total:${companyId}`])

    res.sendStatus(200)
  } catch (e) {
    logger.error(`error happend in add invoice: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default addInvoice
