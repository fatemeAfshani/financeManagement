import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'

import { getRequest } from '../util'
import db from '../../database/db'
import { Product } from '../../types'

beforeAll(async () => {
  await db.table<Product>('product').del()
})

afterAll(async () => {
  await db.table<Product>('product').del()
})

describe('get products get /products', () => {
  describe('successful test cases', () => {
    describe('empty table', () => {
      test('should return empty array when there is no product', async () => {
        const response = await getRequest('/products', {})
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
      })
    })
    describe('table has data', () => {
      beforeAll(async () => {
        await db.table<Product>('product').insert([
          { name: 'getProduct1', amount: 1, price: 1 },
          { name: 'getProduct2', amount: 1, price: 1 },
          { name: 'getProduct3', amount: 1, price: 1 },
          { name: 'getProduct4', amount: 1, price: 1 },
          { name: 'getProduct5', amount: 1, price: 1 },
          { name: 'getProduct6', amount: 1, price: 1 },
          { name: 'getProduct7', amount: 1, price: 1 },
          { name: 'getProduct8', amount: 1, price: 1 },
          { name: 'getProduct9', amount: 1, price: 1 },
          { name: 'getProduct10', amount: 1, price: 1 },
          { name: 'getProduct11', amount: 1, price: 1 },
        ])
      })

      test('should return products where there is no limit and offset <default first 10>', async () => {
        const response = await getRequest('/products', {})
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(10)
      })
      test('should return products where there is  limit and offset 1', async () => {
        const response = await getRequest('/products', { limit: 5, offset: 1 })
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(5)
      })
      test('should return products where there is  limit and offset 2', async () => {
        const response = await getRequest('/products', { limit: 1, offset: 1 })
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
      })
      test('should return products where there is  limit and offset 3', async () => {
        const response = await getRequest('/products', { limit: 5, offset: 3 })
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
          const response = await getRequest('/products', data.query)
          expect(response.statusCode).toBe(400)
          expect(response.text).toContain(data.message)
        })
      )
    })
  })
})
