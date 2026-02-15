import { Product } from '@/types'

// Use picsum.photos for reliable placeholder images (works with Next.js Image)
const placeholder = (seed: string) => `https://picsum.photos/seed/${seed}/400/400`

const menCategory = {
  id: 'cat-men',
  name: "Men's",
  slug: 'men',
  description: "Men's collection",
}

const womenCategory = {
  id: 'cat-women',
  name: "Women's",
  slug: 'women',
  description: "Women's collection",
}

const baseProduct = (
  id: string,
  name: string,
  description: string,
  price: number,
  gender: 'men' | 'women',
  category: { id: string; name: string; slug: string; description?: string }
): Product => ({
  id,
  name,
  description,
  price,
  images: [placeholder(id)],
  category,
  gender,
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Navy', 'Gray'],
  stock: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const dummyProductsMen: Product[] = [
  baseProduct(
    'dummy-men-1',
    'Classic Cotton T-Shirt',
    'Comfortable everyday cotton tee. Perfect for casual wear.',
    29.99,
    'men',
    menCategory
  ),
  baseProduct(
    'dummy-men-2',
    'Slim Fit Chinos',
    'Versatile slim-fit chinos for a smart casual look.',
    59.99,
    'men',
    menCategory
  ),
  baseProduct(
    'dummy-men-3',
    'Leather Casual Sneakers',
    'Lightweight leather sneakers for all-day comfort.',
    89.99,
    'men',
    menCategory
  ),
  baseProduct(
    'dummy-men-4',
    'Denim Jacket',
    'Timeless denim jacket. A wardrobe essential.',
    79.99,
    'men',
    menCategory
  ),
]

export const dummyProductsWomen: Product[] = [
  baseProduct(
    'dummy-women-1',
    'Floral Midi Dress',
    'Elegant floral print midi dress. Perfect for any occasion.',
    69.99,
    'women',
    womenCategory
  ),
  baseProduct(
    'dummy-women-2',
    'High-Waist Trousers',
    'Tailored high-waist trousers for a polished look.',
    54.99,
    'women',
    womenCategory
  ),
  baseProduct(
    'dummy-women-3',
    'Knit Cardigan',
    'Soft knit cardigan. Layer it over any outfit.',
    49.99,
    'women',
    womenCategory
  ),
  baseProduct(
    'dummy-women-4',
    'Structured Handbag',
    'Minimal structured handbag. Fits all essentials.',
    79.99,
    'women',
    womenCategory
  ),
]

const allDummyProducts = [...dummyProductsMen, ...dummyProductsWomen]

export function getDummyProductById(id: string): Product | undefined {
  return allDummyProducts.find((p) => p.id === id)
}
