import { Request, Response } from 'express'
import productDB from '../../database/products'
import logger from '../../logger'
import { translateErrorMessage } from '../../utils'

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await productDB.deleteOne(+id)
    if (product) {
      res.sendStatus(200)
    } else {
      res
        .status(404)
        .send({ error: translateErrorMessage('product is already deleted') })
    }
  } catch (e) {
    logger.error(`error happend in delete Product: ${e}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export default deleteProduct
