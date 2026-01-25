import { ProductI, CategoryI } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Headphones } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/productCard/ProductCard'
import { Badge } from '@/components/ui/badge'

async function getProducts() {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/products?limit=8')
  const data = await res.json()
  return data.data as ProductI[]
}

async function getCategories() {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const data = await res.json()
  return data.data as CategoryI[]
}

export default async function HomePage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <main className="flex flex-col gap-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-slate-900 flex items-center">
        <div className="container mx-auto px-4 z-10 flex flex-col gap-6">
          <Badge className="w-fit bg-blue-600 hover:bg-blue-700 text-lg py-1 px-4">New Collection 2026</Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white max-w-2xl leading-[1.1]">
            Upgrade Your Style With <span className="text-blue-500">WallMart</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-xl leading-relaxed">
            Discover the latest trends in technology and fashion with exclusive prices and fast shipping to your door.
          </p>
          <div className="flex gap-4 mt-4">
            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl" asChild>
              <Link href="/products">Shop Now <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-xl bg-white/10 text-white border-white/20 hover:bg-white/20">
              Explore Categories
            </Button>
          </div>
        </div>
        {/* خلفية جمالية - يمكنك وضع صورة هنا */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
      </section>

      {/* 2. Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-blue-50 rounded-3xl border border-blue-100">
          <div className="flex items-center gap-5">
            <div className="bg-blue-600 p-4 rounded-2xl text-white"><Truck size={32} /></div>
            <div><h3 className="font-bold text-xl">Free Shipping</h3><p className="text-muted-foreground">On all orders over 1000 EGP</p></div>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-blue-600 p-4 rounded-2xl text-white"><ShieldCheck size={32} /></div>
            <div><h3 className="font-bold text-xl">Secure Payment</h3><p className="text-muted-foreground">100% secure payment processing</p></div>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-blue-600 p-4 rounded-2xl text-white"><Headphones size={32} /></div>
            <div><h3 className="font-bold text-xl">24/7 Support</h3><p className="text-muted-foreground">Dedicated support anytime</p></div>
          </div>
        </div>
      </section>

      {/* 3. Popular Categories Slider (Static Preview) */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tight">Popular Categories</h2>
            <p className="text-muted-foreground mt-2 text-lg font-medium">Browse products by category</p>
          </div>
          <Button variant="ghost" className="text-blue-600 font-bold hover:bg-blue-50">View All</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <div key={cat._id} className="group cursor-pointer text-center space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-full border-4 border-transparent group-hover:border-blue-600 transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all" />
              </div>
              <h3 className="font-bold text-lg group-hover:text-blue-600">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tight italic">Trending Now</h2>
            <p className="text-muted-foreground mt-2 text-lg font-medium">Top picks for you this week</p>
          </div>
          <Link href="/products">
            <Button className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-blue-200">View All Products</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Discount Banner */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[40px] bg-gradient-to-br from-blue-700 to-indigo-900 p-12 md:p-20 overflow-hidden text-center text-white">
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black italic">Flash Sale: Up to 50% Off!</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              Don't miss our limited time offer on selected items. First come, first served!
            </p>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 h-14 px-10 text-xl font-black rounded-2xl shadow-xl">
              Grab The Deal
            </Button>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
      </section>

    </main>
  )
}