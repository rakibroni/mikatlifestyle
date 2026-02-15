import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { Categories } from '@/components/home/Categories'
import { ProductsByGender } from '@/components/home/ProductsByGender'

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ProductsByGender />
    </div>
  )
}
