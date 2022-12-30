import {NextFunction, Request, Response, Router} from 'express'

import { addProduct } from '../../controllers/products/addProduct'
import { ProductMethod } from '../../types'
import { productValitate } from './validate'


export const productRouter = Router()

productRouter.get('/', (req: Request, res: Response , next: NextFunction) => {
    
})

productRouter.post('/', productValitate(ProductMethod.ADD), addProduct)