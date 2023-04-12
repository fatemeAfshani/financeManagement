export type Product = {
  id?: number
  name: string
  price: number
  amount: number
  companyId: number
  isDeleted?: boolean
}

export type Invoice = {
  id?: number
  productId: number
  amount: number
  pricePerOne: number
  date: string
  remaining: number
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
}

// eslint-disable-next-line no-shadow
export enum Roles {
  ADMIN = 'admin',
  VIEWER = 'viewer',
}
