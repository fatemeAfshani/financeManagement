export type Product = {
  id?: number
  name: string
  price: number
  amount: number
}

export type Invoice = {
  id?: number
  productId: number
  amount: number
  pricePerOne: number
  date: string
  remaining: number
}

// eslint-disable-next-line no-shadow
export const enum Methods {
  Add = 'ADD',
  GetAll = 'GETALL',
  GetOne = 'GETONE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}
