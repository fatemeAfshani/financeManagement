import { Request, Response } from 'express'
import productDB from '../../database/product'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const addProduct = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.user as User
    await productDB.add({ ...req.body, companyId })
    res.sendStatus(200)
  } catch (e) {
    logger.error(`error happend in add Product: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default addProduct
