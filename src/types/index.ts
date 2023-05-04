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
  isShareHolder: boolean
  sharePercent: number
}

export type ShareHolderUser = {
  id: number
  isShareHolder: boolean
  sharePercent: number
}

export type Company = {
  id?: number
  name: string
  createdAt: string
  sharePercent?: number
}

export type OrderProduct = {
  id?: number
  orderId?: number
  productId: number
  sellPrice: number
  buyPrice?: number
  amount: number
}

export type Order = {
  id?: number
  name: string
  address: string
  phone: string
  postalCode: string
  trackingCode: string
  orderDate: string
  shippingDate: string
  shippingPriceCustomer: number
  shippingPriceSeller: number
  discount: number
  totalProfit?: number
  sellFrom: string
  companyId: number
  products?: OrderProduct[]
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

// eslint-disable-next-line no-shadow
export enum SellFrom {
  SITE = 'site',
  INSTAGRAM = 'instagram',
}
