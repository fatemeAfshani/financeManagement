import * as Redis from 'redis'
import logger from './logger'

const { REDIS_URL } = process.env

logger.info(
  `#### redis process.env
  ${REDIS_URL},`
)

const client = Redis.createClient({
  url: REDIS_URL || 'redis://localhost:6379',
})
// eslint-disable-next-line semi-style
;(async () => {
  client.on('error', (err: Redis.ErrorReply) =>
    logger.error('Redis Client Error', err)
  )

  await client.connect()
})()

export default client
