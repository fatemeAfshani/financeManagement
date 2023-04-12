import bcrypt from 'bcrypt'

import translateMessage from './translateMessage'

export const translateErrorMessage = (error: string): string[] => [
  translateMessage[error as keyof object] || error,
]

export const enCodePassword = (password: string): string =>
  bcrypt.hashSync(password, 8)

export const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(password, hashedPassword)
