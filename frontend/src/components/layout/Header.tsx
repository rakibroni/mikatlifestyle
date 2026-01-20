'use client'

import Link from 'next/link'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Mika Lifestyle
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/products/men" className="hover:text-primary-600 transition">
              Men
            </Link>
            <Link href="/products/women" className="hover:text-primary-600 transition">
              Women
            </Link>
            <Link href="/products" className="hover:text-primary-600 transition">
              All Products
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 hover:text-primary-600 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="p-2 hover:text-primary-600 transition">
              <User className="h-6 w-6" />
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-primary-600 transition">
                Home
              </Link>
              <Link href="/products/men" className="hover:text-primary-600 transition">
                Men
              </Link>
              <Link href="/products/women" className="hover:text-primary-600 transition">
                Women
              </Link>
              <Link href="/products" className="hover:text-primary-600 transition">
                All Products
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
