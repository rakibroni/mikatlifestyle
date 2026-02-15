'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types'
import { api } from '@/lib/api'
import { ProductCard } from '@/components/products/ProductCard'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    gender: '',
    categoryId: '',
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams()
        if (filters.gender) params.append('gender', filters.gender)
        if (filters.categoryId) params.append('categoryId', filters.categoryId)

        const response = await api.get(`/products?${params.toString()}`)
        setProducts(response.data.data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [filters])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>

      <div className="mb-8 flex gap-4">
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Genders</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}
    </div>
  )
}
