import * as Redis from 'redis'
import logger from './logger'

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env

const client = Redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT ? +REDIS_PORT : 6379,
  },
  username: REDIS_USERNAME || undefined,
  password: REDIS_PASSWORD || undefined,
})
// eslint-disable-next-line semi-style
;(async () => {
  client.on('error', (err: Redis.ErrorReply) =>
    logger.error('Redis Client Error', err)
  )

  await client.connect()
})()

export default client
