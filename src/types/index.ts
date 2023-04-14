export type Product = {
  id?: number
  name: string
  price: number
  companyId: number
  isDeleted?: boolean
}

export type ProductInvoice = {
  id?: number
  productId: number
  amount: number
  pricePerOne: number
  date: string
  companyId: number
}

export type ProductStock = {
  id?: number
  productId: number
  amount: number
  buyPrice: number
}

export type User = {
  id?: number
  username: string
  password: string
  role: string
  companyId?: number
}

export type Company = {
  id?: number
  name: string
  createdAt: string
}

// eslint-disable-next-line no-shadow
export const enum Methods {
  Add = 'ADD',
  GetAll = 'GETALL',
  GetOne = 'GETONE',
  Delete = 'DELETE',
  Update = 'UPDATE',
  Register = 'REGISTER',
  Login = 'LOGIN',
  GetAllOfOneType = 'GETALLOFONETYPE',
}

// eslint-disable-next-line no-shadow
export enum Roles {
  ADMIN = 'admin',
  VIEWER = 'viewer',
}
