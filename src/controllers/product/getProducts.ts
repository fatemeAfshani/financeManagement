import { Request, Response } from 'express'
import productDB from '../../database/products'
import logger from '../../logger'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const products = await productDB.getAll(+limit, +offset * +limit)
    res.status(200).send(products)
  } catch (e) {
    logger.error(`error happend in get Products: ${e}`)
    res.status(500).send({ error: ['خطایی رخ داده است'] })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await productDB.getOne({ id: +id })
    if (product?.[0]) {
      res.status(200).send(product?.[0])
    } else {
      res.status(404).send({ error: ['محصولی یافت نشد'] })
    }
  } catch (e) {
    logger.error(`error happend in get one Product: ${e}`)
    res.status(500).send({ error: ['خطایی رخ داده است'] })
  }
}
