export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: Category
  gender: 'men' | 'women' | 'unisex'
  sizes: string[]
  colors: string[]
  stock: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  createdAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}
