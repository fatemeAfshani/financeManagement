import { Product } from '../../types'
import {db} from '../db'


const get = (): Promise<Product[]> => {
    return db.table<Product>("products").select("*");

}

const add = (product : Product):  Promise<object> => {
    return db.table<Product>('products').insert(product)
}


export default {
    get,
    add
}