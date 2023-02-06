import { Request, Response } from 'express'
import productDB from '../../database/products'
import logger from '../../logger'

const addProduct = async (req: Request, res: Response) => {
  try {
    await productDB.add(req.body)
    res.sendStatus(200)
  } catch (e) {
    logger.error(`error happend in add Product: ${e}`)
    res.status(500).send({ error: ['خطایی رخ داده است'] })
  }
}

export default addProduct
