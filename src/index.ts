import path from 'path'
import express from 'express';
import { config } from 'dotenv';
config({ path: path.join(__dirname, '../config/development.env') })

const app = express()


app.listen(process.env.PORT, () => {
    console.log(`app is up and running on port ${process.env.PORT}`)
})

