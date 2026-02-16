'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Product } from '@/types'
import { getDummyProductById } from '@/data/dummyProducts'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (!productId) {
      setLoading(false)
      return
    }
    // Use dummy data for product details
    const dummyProduct = getDummyProductById(productId)
    if (dummyProduct) {
      setProduct(dummyProduct)
      if (dummyProduct.sizes.length > 0) setSelectedSize(dummyProduct.sizes[0])
      if (dummyProduct.colors.length > 0) setSelectedColor(dummyProduct.colors[0])
    }
    setLoading(false)
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
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-600 mb-6">Product not found.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const currentImage = product.images?.[selectedImageIndex] ?? product.images?.[0]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Link
        href={product.gender === 'women' ? '/products/women' : '/products/men'}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {product.gender === 'women' ? "Women's" : "Men's"} collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-xl overflow-hidden shadow-sm">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImageIndex === i
                      ? 'border-primary-600'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
            {product.category.name}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl md:text-3xl font-bold text-primary-600 mb-6">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          {product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-4 py-2.5 border rounded-lg font-medium transition ${
                      selectedSize === size
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-300 hover:border-primary-600 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2.5 border rounded-lg font-medium transition ${
                      selectedColor === color
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-300 hover:border-primary-600 text-gray-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                −
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3.5 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            <ShoppingBag className="h-5 w-5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <p className="mt-4 text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Currently out of stock'}
          </p>
        </div>
      </div>
    </div>
  )
}
