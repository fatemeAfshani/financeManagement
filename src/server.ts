import app from './app'
import config from 'config';

app.listen(config.get('port'), () => {
    console.log(`app is up and running on port ${config.get('port')}`)
})

