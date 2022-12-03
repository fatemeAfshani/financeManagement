import {NextFunction, Request, Response} from 'express'
import { db } from '../../database/db';


export const testController = async (req : Request, res: Response, next : NextFunction) => {
    try {
        await db.from("information_schema.tables").select();
        res.status(200);
      } catch (error) {
        console.log("#### error", error)
        // next(error);
      }
}