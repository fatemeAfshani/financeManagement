import { Request, Response } from 'express'
import productDB from '../../database/product'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { companyId } = req.user as User

    const products = await productDB.getAll(
      +limit,
      +offset * +limit,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      companyId!
    )
    res.status(200).send(products)
  } catch (e) {
    logger.error(`error happend in get Products: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User
    const product = await productDB.getOne({ id: +id, companyId })
    if (product?.[0]) {
      res.status(200).send(product?.[0])
    } else {
      res
        .status(404)
        .send({ error: translateErrorMessage('product not found') })
    }
  } catch (e) {
    logger.error(`error happend in get one Product: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}
