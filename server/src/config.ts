// we have to do this in seperate file than app.ts to be able to use process.env every where
// because Imports are hoisted,
// so dotenv.config isn't being called until after the rest of imports.
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, './config/conf.env') })
