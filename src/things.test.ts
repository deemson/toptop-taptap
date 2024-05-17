import { expect, test, describe } from '@jest/globals'

test('repeated array', () => {
  expect(new Array<boolean>(3).fill(false)).toStrictEqual([false, false, false])
})