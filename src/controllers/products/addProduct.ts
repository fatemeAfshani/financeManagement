import { NextFunction, Request, Response } from "express"
import { Product } from "../../types"
import productDB from '../../database/products'
import { validationResult } from "express-validator";

export const addProduct = async (req: Request, res: Response , next: NextFunction) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        await productDB.add(req.body)
        res.send("successful")
    }catch(e){
        console.log("#### error", e)
        res.send("error")
    }
}