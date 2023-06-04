export type Product = {
  id: number
  name: string
  price: number
  companyId: number
  isDeleted: boolean
}

export const enum API_ACTIONS {
  CALL_API = 'call-api',
  SUCCESS = 'success',
  ERROR = 'error',
}
