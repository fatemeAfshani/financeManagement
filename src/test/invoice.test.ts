import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from '@jest/globals'

import { deleteRequest, getRequest, postRequest } from './util'
import db from '../database/db'
import { Invoice, Product } from '../types'

const productSample = { name: 'addProductForInvoice', amount: 1, price: 1 }
const addInvoiceSample = { amount: 1, pricePerOne: 1 }

let productId: number

beforeAll(async () => {
  await db.table<Invoice>('product_invoice').del()
  await db.table<Product>('product').where({ name: productSample.name }).del()
  const product = await db
    .table<Product>('product')
    .insert(productSample, ['id'])
  productId = product?.[0]?.id
})

describe('add new invoice POST /invoice', () => {
  describe('successful test cases', () => {
    test('should add new invoice', async () => {
      const response = await postRequest('/invoice', {
        ...addInvoiceSample,
        productId,
      })

      const product = await getRequest(`/products/${productId}`, {})

      expect(response.statusCode).toBe(200)
      expect(product.body.amount).toBe(2)
    })
  })
  describe('failure test cases', () => {
    test('should error if product with this id does not exist', async () => {
      const response = await postRequest('/invoice', {
        ...addInvoiceSample,
        productId: 1,
      })
      expect(response.statusCode).toBe(400)
      expect(response.text).toContain('محصولی یافت نشد')
    })
    test('should error if body is not sent or is invalid', async () => {
      const sampleData = [
        {
          body: { amount: 1, pricePerOne: 1 },
          message: 'شناسه محصول معتبر نیست',
        },
        {
          body: { productId: 'sample', amount: 1, pricePerOne: 1 },
          message: 'شناسه محصول معتبر نیست',
        },
        { body: { name: 'test', amount: 1 }, message: 'مبلغ معتبر نیست' },
        {
          body: { name: 'test', amount: 1, pricePerOne: 'random' },
          message: 'مبلغ معتبر نیست',
        },
        { body: { name: 'test', pricePerOne: 1 }, message: 'تعداد معتبر نیست' },
        {
          body: { name: 'test', pricePerOne: 1, amount: 'random' },
          message: 'تعداد معتبر نیست',
        },
      ]

      Promise.all(
        sampleData.map(async (data) => {
          const response = await postRequest('/invoice', data.body)
          expect(response.statusCode).toBe(400)
          expect(response.text).toContain(data.message)
        })
      )
    })
  })
})

// describe('get products get /products', () => {
//   beforeAll(async () => {
//     await db.table<Product>('product').del()
//   })

//   // afterAll(async () => {
//   //   await db.table<Product>('product').del()
//   // })

//   describe('successful test cases', () => {
//     describe('empty table', () => {
//       test('should return empty array when there is no product', async () => {
//         const response = await getRequest('/products', {})
//         expect(response.status).toBe(200)
//         expect(response.body).toHaveLength(0)
//       })
//     })
//     describe('table has data', () => {
//       beforeAll(async () => {
//         await db.table<Product>('product').insert([
//           { name: 'getProduct1', amount: 1, price: 1 },
//           { name: 'getProduct2', amount: 1, price: 1 },
//           { name: 'getProduct3', amount: 1, price: 1 },
//           { name: 'getProduct4', amount: 1, price: 1 },
//           { name: 'getProduct5', amount: 1, price: 1 },
//           { name: 'getProduct6', amount: 1, price: 1 },
//           { name: 'getProduct7', amount: 1, price: 1 },
//           { name: 'getProduct8', amount: 1, price: 1 },
//           { name: 'getProduct9', amount: 1, price: 1 },
//           { name: 'getProduct10', amount: 1, price: 1 },
//           { name: 'getProduct11', amount: 1, price: 1 },
//         ])
//       })

// test('should return products where there is no limit and offset <default first 10>', async () => {
//         const response = await getRequest('/products', {})

//         expect(response.status).toBe(200)
//         expect(response.body).toHaveLength(10)
//       })
//       test('should return products where there is  limit and offset 1', async () => {
//         const response = await getRequest('/products', { limit: 5, offset: 1 })

//         expect(response.status).toBe(200)
//         expect(response.body).toHaveLength(5)
//       })
//       test('should return products where there is  limit and offset 2', async () => {
//         const response = await getRequest('/products', { limit: 1, offset: 1 })

//         expect(response.status).toBe(200)
//         expect(response.body).toHaveLength(1)
//       })
//       test('should return products where there is  limit and offset 3', async () => {
//         const response = await getRequest('/products', { limit: 5, offset: 3 })

//         expect(response.status).toBe(200)
//         expect(response.body).toHaveLength(0)
//       })
//     })
//   })
//   describe('failure test cases', () => {
//     test('should error if offset and limit are string', async () => {
//       const sampleData = [
//         { query: { limit: 'random' }, message: 'limit معتبر نیست' },
//         { query: { offset: 'random' }, message: 'offset معتبر نیست' },
//       ]

//       Promise.all(
//         sampleData.map(async (data) => {
//           const response = await getRequest('/products', data.query)

//           expect(response.statusCode).toBe(400)
//           expect(response.text).toContain(data.message)
//         })
//       )
//     })
//   })
// })

// describe('get one product get /products/:id', () => {
//   describe('successful test cases', () => {
//     test('should return product if it exists', async () => {
//       await db
//         .table<Product>('product')
//         .where({ name: getOneProductSample.name })
//         .del()
//       const product = await db
//         .table<Product>('product')
//         .insert(getOneProductSample, ['id'])

//       const response = await getRequest(`/products/${product?.[0].id}`, {})

//       expect(response.status).toBe(200)
//       expect(response.body.name).toBe('getProduct')
//     })
//   })
//   describe('failure test cases', () => {
//     test('should error if product does not exits', async () => {
//       await db.table<Product>('product').where({ id: 1 }).del()

//       const response = await getRequest(`/products/${1}`, {})

//       expect(response.statusCode).toBe(404)
//       expect(response.text).toContain('محصولی یافت نشد')
//     })
//     test('should error if id is not valid', async () => {
//       const response = await getRequest('/products/sample', {})

//       expect(response.statusCode).toBe(400)
//       expect(response.text).toContain('شناسه محصول معتبر نیست')
//     })
//   })
// })
