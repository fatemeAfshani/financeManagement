import { Request, Response } from 'express'
import moment from 'jalali-moment'

import invoiceDB from '../../database/invoices'
import logger from '../../logger'
import { translateErrorMessage } from '../../utils'

const addInvoice = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      date: moment().format('jYYYY/jMM/jDD HH:mm:ss'),
    }
    await invoiceDB.add(data)
    res.sendStatus(200)
  } catch (e) {
    logger.error(`error happend in add invoice: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export default addInvoice
