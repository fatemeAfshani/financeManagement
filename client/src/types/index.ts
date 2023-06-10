export type Product = {
  id: number
  name: string
  price: number
  companyId: number
  isDeleted: boolean
  amount?: number
}

export const enum API_ACTIONS {
  CALL_API = 'call-api',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type ProductStock = {
  id?: number
  productId: number
  amount: number
  buyPrice: number
  name: string
  price: number
}

export type ProductInvoice = {
  id: number
  productId: number
  amount: number
  pricePerOne: number
  date: string
  companyId?: number
  name?: string
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

export type User = {
  id: number
  username: string
  role: string
  companyId: number
  isShareHolder: boolean
  sharePercent: number
  isDeleted?: boolean
}

export type Company = {
  id: number
  name: string
  createdAt: string
  sharePercent: number
}
