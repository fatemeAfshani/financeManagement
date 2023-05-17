import { Request, Response } from 'express'
import stockDB from '../../database/product-stock'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

export const getStocks = async (req: Request, res: Response) => {
  try {
    const { limit = '10', offset = '0' } = req.query
    const { companyId } = req.user as User
    const stocks = await stockDB.getAll(+limit, +offset * +limit, companyId!)
    res.status(200).send(stocks)
  } catch (e) {
    logger.error(`error happend in get stocks: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export const getStocksOfOneProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const stocks = await stockDB.getAllForOneProduct({
      productId: +id,
    })
    if (stocks.length !== 0) {
      res.status(200).send(stocks)
    } else {
      res.status(404).send({
        error: translateErrorMessage(
          req.cookies?.language,
          'no stock found for this product'
        ),
      })
    }
  } catch (e) {
    logger.error(`error happend in get stocks of a product: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}
