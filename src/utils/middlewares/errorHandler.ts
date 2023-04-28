import { NextFunction, Request, Response } from 'express'
import { ValidationError, validationResult } from 'express-validator'
import translateMessage from '../translateMessage'

const translateValidationErrorMessage = (errors: ValidationError[]): string =>
  translateMessage[errors[0].msg as keyof object] || 'خطایی رخ داده است'

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: translateValidationErrorMessage(errors.array()) })
  }
  next()
}

export default errorHandler
