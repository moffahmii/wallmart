import { ProductI, CategoryI } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { ArrowRight, Truck, ShieldCheck, Headphones } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/productCard/ProductCard'
import { Badge } from '@/components/ui/badge'

// ================= FETCH (SAFE – SAME LOGIC) =================

async function getProducts(): Promise<ProductI[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=8`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.data) ? data.data : []
  } catch {
    return []
  }
}

async function getCategories(): Promise<CategoryI[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.data) ? data.data : []
  } catch {
    return []
  }
}

// ================= PAGE =================

export default async function HomePage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <main className="flex flex-col gap-28 pb-24">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <Badge className="bg-blue-600 hover:bg-blue-700 px-5 py-2 text-base">
              New Collection 2026
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
              Upgrade Your Style with <span className="text-blue-500">WallMart</span>
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
              Discover premium tech & fashion picks with unbeatable prices and lightning-fast delivery.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-10 text-lg rounded-2xl font-bold" asChild>
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-lg rounded-2xl bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* ================= FEATURES ================= */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature icon={<Truck size={30} />} title="Fast Shipping" desc="Free delivery over 1000 EGP" />
          <Feature icon={<ShieldCheck size={30} />} title="Secure Payments" desc="Trusted & encrypted checkout" />
          <Feature icon={<Headphones size={30} />} title="24/7 Support" desc="We’re here anytime you need us" />
        </div>
      </section>
      {/* ================= CATEGORIES ================= */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Popular Categories"
          desc="Browse products by category"
          href="/categories"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className="group"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="font-bold text-lg group-hover:text-blue-600 transition">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* ================= PRODUCTS ================= */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Trending Now"
          desc="Top picks curated for you"
          href="/products"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}

// ================= UI COMPONENTS =================
function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 flex items-center gap-5 hover:shadow-lg transition">
      <div className="bg-blue-600 p-4 rounded-2xl text-white">{icon}</div>
      <div>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
function SectionHeader({
  title,
  desc,
  href,
}: {
  title: string
  desc: string
  href: string
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
      <div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          {desc}
        </p>
      </div>
      <Link href={href}>
        <Button variant="ghost" className="text-blue-600 font-bold text-lg">
          View All →
        </Button>
      </Link>
    </div>
  )
}
