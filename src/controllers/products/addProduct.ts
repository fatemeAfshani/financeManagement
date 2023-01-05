import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import productDB from '../../database/products'

const addProduct = async (req: Request, res: Response, _: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    await productDB.add(req.body)
    res.send('successful')
  } catch (e) {
    console.log('#### error', e)
    res.send('error')
  }
}

export default addProduct
