import { testController } from "../../controllers/test";
import {Router} from 'express'

export const testRouter = Router()

testRouter.get('/hello', testController)