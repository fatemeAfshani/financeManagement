import bcrypt from 'bcrypt'

import redisClient from '../redis'
import { User } from '../types'
import translateMessage from './translateMessage'

export const translateErrorMessage = (error: string): string[] => [
  translateMessage[error as keyof object] || ' خطایی رخ داده است',
]

export const enCodePassword = (password: string): string =>
  bcrypt.hashSync(password, 8)

export const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(password, hashedPassword)

export const deleteRedisData = async (companyId: number, users: User[]) => {
  await redisClient.del([
    `company:${companyId}-income-all`,
    `company:${companyId}-income`,
    `company:${companyId}-income-not-settled`,
  ])
  users.forEach(async (user) => {
    await redisClient.del([
      `user:${user.id}-income`,
      `user:${user.id}-income-not-settled`,
    ])
  })
}
