import { Request, Response } from 'express'
import moment from 'jalali-moment'

import invoiceDB from '../../database/product-invoice'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const addInvoice = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    const data = {
      ...req.body,
      date: moment().format('jYYYY/jMM/jDD HH:mm:ss'),
      companyId,
    }
    await invoiceDB.add(data)
    res.sendStatus(200)
  } catch (e) {
    logger.error(`error happend in add invoice: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export default addInvoice
