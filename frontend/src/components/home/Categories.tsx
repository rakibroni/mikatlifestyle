import Link from 'next/link'
import Image from 'next/image'

export function Categories() {
  const categories = [
    {
      name: "Men's Collection",
      slug: 'men',
      image: '/images/men-category.jpg',
      description: 'Stylish fashion for men',
    },
    {
      name: "Women's Collection",
      slug: 'women',
      image: '/images/women-category.jpg',
      description: 'Elegant fashion for women',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-600">
                  {category.name}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
