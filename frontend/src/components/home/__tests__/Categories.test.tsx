import { render, screen } from '@testing-library/react'
import { Categories } from '../Categories'

describe('Categories', () => {
  it('renders section heading and category links', () => {
    render(<Categories />)
    expect(screen.getByRole('heading', { name: /shop by category/i })).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    const menLink = links.find((link) => link.getAttribute('href') === '/products/men')
    const womenLink = links.find((link) => link.getAttribute('href') === '/products/women')

    expect(menLink).toBeInTheDocument()
    expect(womenLink).toBeInTheDocument()
  })
})
