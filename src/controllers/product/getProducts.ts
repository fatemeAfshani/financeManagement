import { Request, Response } from 'express'
import productDB from '../../database/products'
import logger from '../../logger'

const getProducts = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const products = await productDB.getAll(+limit, +offset * +limit)
    res.status(200).send(products)
  } catch (e) {
    logger.error(`error happend in add Product: ${e}`)
    res.status(500).send({ error: ['خطایی رخ داده است'] })
  }
}

export default getProducts
