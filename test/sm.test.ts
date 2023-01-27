import { describe, expect, test } from '@jest/globals'

import add from '../src/ddtest'

describe('test add function', () => {
  test('should return 15 for add(10,5)', () => {
    expect(add(10, 5)).toBe(15)
  })
  test('should return 5 for add(2,3)', () => {
    expect(add(2, 3)).toBe(5)
  })
  test('should return 5 for add(2,3)', () => {
    expect(add(2, 3)).not.toBe(3)
  })
})
