'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { api } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'react-hot-toast'
import { getDummyProductById } from '@/data/dummyProducts'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false)
        return
      }

      const dummyProduct = getDummyProductById(productId)
      if (dummyProduct) {
        setProduct(dummyProduct)
        setSelectedSize(dummyProduct.sizes[0] ?? '')
        setSelectedColor(dummyProduct.colors[0] ?? '')
        setLoading(false)
        return
      }

      try {
        const response = await api.get(`/products/${productId}`)
        const data = response.data?.data ?? response.data
        setProduct(data)
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0])
        if (data.colors?.length > 0) setSelectedColor(data.colors[0])
      } catch {
        setProduct(null)
        toast.error('Product not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color')
      return
    }
    addItem({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })
    toast.success('Added to cart!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-2xl" />
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded w-3/4" />
                <div className="h-8 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-2 pt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 w-16 bg-gray-200 rounded-lg" />
                  ))}
                </div>
                <div className="h-14 bg-gray-200 rounded-xl w-full mt-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
        >
          <ArrowLeft className="h-5 w-5" />
          Browse all products
        </Link>
      </div>
    )
  }

  const images = product.images?.length ? product.images : []
  const mainImage = images[selectedImageIndex] ?? images[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/products/${product.category?.slug ?? 'products'}`}
            className="hover:text-primary-600 transition"
          >
            {product.category?.name ?? 'Products'}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]" title={product.name}>
            {product.name}
          </span>
        </nav>

        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  No image
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === i
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <Link
                href={`/products/${product.category.slug}`}
                className="inline-block text-sm font-medium text-primary-600 hover:underline mb-2"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-2xl font-bold text-primary-600 mb-6">{formatPrice(product.price)}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Size */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-4 py-2.5 rounded-lg border-2 font-medium transition ${
                        selectedSize === size
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-400 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`min-w-[4rem] px-4 py-2.5 rounded-lg border-2 font-medium transition ${
                        selectedColor === color
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-400 text-gray-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <div className="inline-flex items-center gap-1 rounded-lg border-2 border-gray-200 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 font-medium text-gray-600"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 font-medium text-gray-600"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {product.stock > 0 && (
                <p className="mt-2 text-sm text-gray-500">{product.stock} in stock</p>
              )}
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-lg shadow-primary-600/20"
            >
              <ShoppingCart className="h-5 w-5" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <Link
              href="/products"
              className="mt-4 inline-block text-center w-full text-gray-600 hover:text-primary-600 font-medium transition"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
