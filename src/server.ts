import * as dotenv from 'dotenv'
import path from 'path'
import app from './app'

dotenv.config({ path: path.resolve(__dirname, '../development.env') })

app.listen(process.env.PORT, () => {
  console.log(`app is up and running on port ${process.env.PORT}`)
})
