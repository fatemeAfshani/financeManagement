import { ValidationError } from 'express-validator'
import translateMessage from './translateMessage'

export const translateErrorMessage = (errors: ValidationError[]): string[] => {
  const errorMessages = errors.map(
    (err) => translateMessage[err.msg as keyof object] || err.msg
  )
  return errorMessages
}

export const hello = () => {
  // kljhlk
}
