import { formatPrice, cn } from '../utils'

describe('formatPrice', () => {
  it('formats number as USD currency', () => {
    expect(formatPrice(0)).toBe('$0.00')
    expect(formatPrice(29.99)).toBe('$29.99')
    expect(formatPrice(100)).toBe('$100.00')
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('px-2', 'py-2')).toContain('px-2')
  })
})
