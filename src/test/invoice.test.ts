import { beforeAll, describe, expect, test } from '@jest/globals'

import { getRequest, postRequest } from './util'
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

describe('add new invoice POST /invoices', () => {
  describe('successful test cases', () => {
    test('should add new invoice', async () => {
      const response = await postRequest('/invoices', {
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
      const response = await postRequest('/invoices', {
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
          const response = await postRequest('/invoices', data.body)
          expect(response.statusCode).toBe(400)
          expect(response.text).toContain(data.message)
        })
      )
    })
  })
})

describe('get invoices get /invoices', () => {
  beforeAll(async () => {
    await db.table<Invoice>('product_invoice').del()
  })

  // afterAll(async () => {
  //   await db.table<Product>('product').del()
  // })

  describe('successful test cases', () => {
    describe('empty table', () => {
      test('should return empty array when there is no invoice', async () => {
        const response = await getRequest('/invoices', {})
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
      })
    })
    describe('table has data', () => {
      beforeAll(async () => {
        await db.table<Invoice>('product_invoice').insert([
          { productId, amount: 1, pricePerOne: 1 },
          { productId, amount: 1, pricePerOne: 2 },
          { productId, amount: 1, pricePerOne: 3 },
          { productId, amount: 1, pricePerOne: 4 },
          { productId, amount: 1, pricePerOne: 5 },
          { productId, amount: 1, pricePerOne: 6 },
          { productId, amount: 1, pricePerOne: 7 },
          { productId, amount: 1, pricePerOne: 8 },
          { productId, amount: 1, pricePerOne: 9 },
          { productId, amount: 1, pricePerOne: 10 },
          { productId, amount: 1, pricePerOne: 11 },
        ])
      })

      test('should return invoices where there is no limit and offset <default first 10>', async () => {
        const response = await getRequest('/invoices', {})

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(10)
      })
      test('should return invoices where there is  limit and offset 1', async () => {
        const response = await getRequest('/invoices', { limit: 5, offset: 1 })

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(5)
      })
      test('should return invoices where there is  limit and offset 2', async () => {
        const response = await getRequest('/invoices', { limit: 1, offset: 1 })

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
      })
      test('should return invoices where there is limit of 5 and offset 3', async () => {
        const response = await getRequest('/invoices', { limit: 5, offset: 3 })

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
      })
    })
  })
  describe('failure test cases', () => {
    test('should error if offset and limit are string', async () => {
      const sampleData = [
        { query: { limit: 'random' }, message: 'limit معتبر نیست' },
        { query: { offset: 'random' }, message: 'offset معتبر نیست' },
      ]

      Promise.all(
        sampleData.map(async (data) => {
          const response = await getRequest('/invoices', data.query)

          expect(response.statusCode).toBe(400)
          expect(response.text).toContain(data.message)
        })
      )
    })
  })
})

describe('get one invoice get /invoices/:id', () => {
  describe('successful test cases', () => {
    test('should return invoice if it exists', async () => {
      await db.table<Invoice>('product_invoice').where({ productId }).del()
      const invoice = await db
        .table<Invoice>('product_invoice')
        .insert({ ...addInvoiceSample, productId }, ['id'])

      const response = await getRequest(`/invoices/${invoice?.[0].id}`, {})

      expect(response.status).toBe(200)
      expect(response.body.amount).toBe(1)
      expect(response.body.pricePerOne).toBe(1)
    })
  })
  describe('failure test cases', () => {
    test('should error if invoice does not exits', async () => {
      const response = await getRequest(`/invoices/${1}`, {})

      expect(response.statusCode).toBe(404)
      expect(response.text).toContain('فاکتور یافت نشد')
    })
    test('should error if id is not valid', async () => {
      const response = await getRequest('/invoices/sample', {})

      expect(response.statusCode).toBe(400)
      expect(response.text).toContain('شناسه ارسالی معتبر نیست')
    })
  })
})

describe('get invoices of one product get /invoices/product/:id', () => {
  describe('successful test cases', () => {
    test('should return invoices if it exists', async () => {
      await db.table<Invoice>('product_invoice').where({ productId }).del()
      await db
        .table<Invoice>('product_invoice')
        .insert({ ...addInvoiceSample, productId })

      const response = await getRequest(`/invoices/product/${productId}`, {})
      console.log('response.body', response.body)
      expect(response.status).toBe(200)
    })
  })
  describe('failure test cases', () => {
    test('should error if invoice does not exits', async () => {
      const response = await getRequest(`/invoices/product/${1}`, {})

      expect(response.statusCode).toBe(404)
      expect(response.text).toContain('فاکتوری برای این محصول یافت نشد')
    })
    test('should error if id is not valid', async () => {
      const response = await getRequest('/invoices/sample', {})

      expect(response.statusCode).toBe(400)
      expect(response.text).toContain('شناسه ارسالی معتبر نیست')
    })
  })
})
