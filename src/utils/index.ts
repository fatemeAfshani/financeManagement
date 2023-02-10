import { NextFunction, Request, Response } from 'express'
import { ValidationError, validationResult } from 'express-validator'
import translateMessage from './translateMessage'

const translateValidationErrorMessage = (
  errors: ValidationError[]
): string[] => {
  const errorMessages = errors.map(
    (err) => translateMessage[err.msg as keyof object] || err.msg
  )
  return errorMessages
}

export const translateErrorMessage = (error: string): string[] => [
  translateMessage[error as keyof object] || error,
]

export const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: translateValidationErrorMessage(errors.array()) })
  }
  next()
}
