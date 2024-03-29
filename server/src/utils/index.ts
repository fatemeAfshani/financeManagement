import bcrypt from 'bcrypt'

import redisClient from '../redis'
import { User } from '../types'
import translateMessage from './translateMessage'

export const translateErrorMessage = (
  language: string | undefined,
  errorMessage: string
): string => {
  if (language === 'fa') {
    return (
      translateMessage[errorMessage as keyof object] || ' خطایی رخ داده است'
    )
  }
  return errorMessage || 'something went wrong'
}

export const enCodePassword = (password: string): string =>
  bcrypt.hashSync(password, 8)

export const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(password, hashedPassword)

export const deleteRedisData = async (keys: string[]) => {
  await redisClient.del(keys)
}

export const deleteUserRedisData = async (users: User[]) => {
  users.forEach(async (user) => {
    await redisClient.del([
      `user:${user.id}-income`,
      `user:${user.id}-income-notsettled`,
    ])
  })
}
