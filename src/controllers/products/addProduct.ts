import { NextFunction, Request, Response } from "express"
import { Product } from "../../types"
import productDB from '../../database/products'

export const addProduct = async (req: Request, res: Response , next: NextFunction) => {
    const product: Product = {
        name : 'محصول جدید',
        sellPrice: 100_000,
        buyPrice: 50_000,
        amount: 10,
    }
    try{
        await productDB.add(product)
        res.send("successful")
    }catch(e){
        console.log("#### error", e)
        res.send("error")
    }
}