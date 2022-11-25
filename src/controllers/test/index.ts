import {NextFunction, Request, Response} from 'express'
import { db } from '../../database/db';


export const testController = async (req : Request, res: Response, next : NextFunction) => {
    try {
        const result = await db.from("information_schema.tables").select();
        console.log("dsdf", result)
        res.send("hello");
      } catch (error) {
        console.log("#### error", error)
        // next(error);
      }
}