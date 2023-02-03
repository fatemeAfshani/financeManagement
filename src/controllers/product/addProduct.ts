import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import productDB from '../../database/products'
import logger from '../../logger'
import { translateErrorMessage } from '../../utils'

const addProduct = async (req: Request, res: Response, _: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: translateErrorMessage(errors.array()) })
  }
  try {
    await productDB.add(req.body)
    res.sendStatus(200)
  } catch (e) {
    logger.error(`error happend in add Product: ${e}`)
    res.status(500).send({ error: ['خطایی رخ داده است'] })
  }
}

export default addProduct
