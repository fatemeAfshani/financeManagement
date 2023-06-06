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
  companyId: number
}
