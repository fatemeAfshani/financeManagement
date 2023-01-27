import { createLogger, transports, format } from 'winston'
import moment from 'jalali-moment'

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: moment().format('jYYYY/jMM/jDD HH:mm:ss'),
    }),
    // format.json()
    format.printf(
      ({ timestamp, level, message }) => `${level} ${message} [${timestamp}]`
    )
  ),
})

export default logger
