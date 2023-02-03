import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'

import postRequest from './util'
import db from '../database/db'
import { Product } from '../types'

beforeAll(async () => {
  await db.table<Product>('product').where({ name: 'test' }).del()
})

afterAll(async () => {
  await db.table<Product>('product').where({ name: 'test' }).del()
})

describe('add new product POST /products', () => {
  describe('successful test cases', () => {
    test('should add new product', async () => {
      const requestBody = { name: 'test', amount: 1, price: 1 }
      const response = await postRequest('/products', requestBody)

      expect(response.statusCode).toBe(200)
    })
  })
  describe('failure test cases', () => {
    test('should error if product with this name already exist', async () => {
      const requestBody = { name: 'test', amount: 1, price: 1 }
      const response = await postRequest('/products', requestBody)
      expect(response.statusCode).toBe(400)
      expect(response.text).toContain('نام محصول تکراری است')
    })
    test('should error if body is not sent or is invalid', async () => {
      const sampleData = [
        { body: { amount: 1, price: 1 }, message: 'نام معتبر نیست' },
        { body: { name: 1, amount: 1, price: 1 }, message: 'نام معتبر نیست' },
        { body: { name: 'test', amount: 1 }, message: 'مبلغ معتبر نیست' },
        {
          body: { name: 'test', amount: 1, price: 'random' },
          message: 'مبلغ معتبر نیست',
        },
        { body: { name: 'test', price: 1 }, message: 'تعداد معتبر نیست' },
        {
          body: { name: 'test', price: 1, amount: 'random' },
          message: 'تعداد معتبر نیست',
        },
      ]

      Promise.all(
        sampleData.map(async (data) => {
          const response = await postRequest('/products', data.body)
          expect(response.statusCode).toBe(400)
          expect(response.text).toContain(data.message)
        })
      )
    })
  })
})
