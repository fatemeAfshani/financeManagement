/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type Product = {
  id?: number
  name: string
  price: number
  companyId: number
  isDeleted?: boolean
  amount?: number
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

export type Role = 'admin' | 'viewer'

export type User = {
  id?: number
  username: string
  password: string
  role: Role
  companyId: number
  isShareHolder: boolean
  sharePercent: number
  isDeleted: boolean
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
  uuid: string
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

export type ShareHolderIncome = {
  id?: number
  amount: number
  sharePercent: number
  date: string
  orderId: number
  isSettled?: boolean
  checkoutId?: string
  isCompanyIncome?: boolean
  userId?: number
  companyId: number
}

export type ShareHolderCheckout = {
  companyId: number
  amount: number
  description?: string
  userId?: number
  date: string
}

export type Count = {
  count: string
}

export type OrderProductInput = {
  productId: number
  sellPrice: number
  amount: number
  name: string
}

export type DateInput = string | undefined

export const enum Methods {
  Add = 'ADD',
  GetAll = 'GETALL',
  GetOne = 'GETONE',
  Delete = 'DELETE',
  Update = 'UPDATE',
  Register = 'REGISTER',
  Login = 'LOGIN',
  GetAllOfOneType = 'GETALLOFONETYPE',
  GetTotal = 'GETTOTAL',
  GetTotalUser = 'GETTOTALUSER',
  Search = 'SEARCH',
}

export type SellFrom = 'site' | 'instagram'

export type Language = 'fa' | 'en'
