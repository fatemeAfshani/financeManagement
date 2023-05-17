import { Request, Response } from 'express'
import productDB from '../../database/product'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User
    const product = await productDB.deleteOne(+id, companyId!)
    if (product) {
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
    logger.error(`error happend in delete Product: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default deleteProduct
