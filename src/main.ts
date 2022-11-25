import app from './app'
import config from 'config';

console.log("###", config.get("port"))
app.listen(config.get('port'), () => {
    console.log(`app is up and running on port ${config.get('port')}`)
})

