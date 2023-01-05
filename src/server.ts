import config from 'config'
import app from './app'

app.listen(config.get('port'), () => {
  console.log(`app is up and running on port ${config.get('port')}`)
})
