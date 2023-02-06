export type Product = {
  id?: number
  name: string
  price: number
  amount: number
}

// eslint-disable-next-line no-shadow
export const enum ProductMethod {
  Add = 'ADD',
  GetAll = 'GETALL',
  GetOne = 'GETONE',
  Delete = 'DELETE',
}
