import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Style</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Explore our latest collection of fashion for men and women
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products/men"
            className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Men
          </Link>
          <Link
            href="/products/women"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
          >
            Shop Women
          </Link>
        </div>
      </div>
    </section>
  )
}
