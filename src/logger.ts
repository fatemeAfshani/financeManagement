import { createLogger, transports, format } from 'winston'
import moment from 'jalali-moment'

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: moment().format('jYYYY/jMM/jDD HH:mm:ss'), // 2022-01-25 03:23:10.350 PM
    }),
    // format.json()
    format.printf(
      ({ timestamp, level, message }) => `${level} ${message} [${timestamp}]`
    )
  ),
})

export default logger
