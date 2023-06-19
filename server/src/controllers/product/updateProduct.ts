import { Request, Response } from 'express'
import productDB from '../../database/product'
import logger from '../../logger'
import { translateErrorMessage } from '../../utils'

const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const { id } = req.params
    const result = await productDB.update(data, +id)
    if (result) {
      res.sendStatus(200)
    } else {
      res.status(404).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'product not found'
        ),
      })
    }
  } catch (e) {
    logger.error(`error happend in update Product: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default updateProduct
