import app from './app'
import logger from './logger'

app.listen(process.env.PORT, () => {
  logger.info(`app is up and running on port ${process.env.PORT}`)
})
