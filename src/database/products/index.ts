import { Product } from '../../types'
import {db} from '../db'


const getAll = (): Promise<Product[]> => {
    return db.table<Product>("product").select("*");

}

const getOne = (name: string): Promise<Product[]> => {
    return db.table<Product>("product").select("*").where({name});

}


const add = (product : Product):  Promise<object> => {
    return db.table<Product>('product').insert(product)
}




export default {
    getAll,
    getOne,
    add
}