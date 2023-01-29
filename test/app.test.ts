import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../src/app'

// beforeAll(() => {})

// afterAll(() => {})

describe('add new product POST /products', () => {
  describe('successful test cases', () => {
    test('should add new product', async () => {
      const response = await request(app)
        .post('/products')
        .send({ name: 'test', amount: 1, price: 1 })
      expect(response.statusCode).toBe(200)
    })
  })
  describe('failure test cases', () => {
    //   test('should error if product with this name already exist', () => {})
    //   test('should error if name is not sent', () => {})
    //   test('should error if name is empty', () => {})
    //   test('should error if price is not sent', () => {})
    //   test('should error if price is not number', () => {})
    //   test('should error if amount is not sent', () => {})
    //   test('should error if amount is number', () => {})
  })
})
