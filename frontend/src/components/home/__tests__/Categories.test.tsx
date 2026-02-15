import { render, screen } from '@testing-library/react'
import { Categories } from '../Categories'

describe('Categories', () => {
  it('renders section heading and category links', () => {
    render(<Categories />)
    expect(screen.getByRole('heading', { name: /shop by category/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /men's collection/i })).toHaveAttribute(
      'href',
      '/products/men'
    )
    expect(screen.getByRole('link', { name: /women's collection/i })).toHaveAttribute(
      'href',
      '/products/women'
    )
  })
})
