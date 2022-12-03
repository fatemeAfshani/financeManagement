import {NextFunction, Request, Response, Router} from 'express'
import { addProduct } from '../../controllers/products/addProduct'


export const productRouter = Router()

productRouter.get('/', (req: Request, res: Response , next: NextFunction) => {
    
})

productRouter.post('/',  addProduct)