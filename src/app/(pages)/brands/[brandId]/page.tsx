import { BrandI, ProductI } from "@/interfaces"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/productCard/ProductCard"

async function getBrandProducts(brandId: string) {
  const response = await fetch(
    `${process.env.API_URL}/products?brand=${brandId}`
  )
  const data = await response.json()
  return data.data as ProductI[]
}

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params

  const brandPromise = fetch(`${process.env.API_URL}/brands/${brandId}`)
  const productsPromise = getBrandProducts(brandId)
  const [brandRes, products] = await Promise.all([brandPromise, productsPromise])
  if (!brandRes.ok) notFound()
  const { data: brand }: { data: BrandI } = await brandRes.json()

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 rounded-[32px] border border-slate-100 mb-12">
        <div className="relative h-40 w-40 bg-white rounded-2xl shadow-sm overflow-hidden p-4 border flex items-center justify-center">
          <img
            src={brand.image}
            alt={brand.name}
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="text-center md:text-left space-y-3">
          <Badge className="bg-blue-600 hover:bg-blue-600 px-4 py-1 text-sm font-bold rounded-full">
            Official Brand
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
            {brand.name}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-muted-foreground italic">
            <p>Slug: <span className="text-slate-900 font-bold">{brand.slug}</span></p>
            <Separator orientation="vertical" className="h-4 hidden md:block" />
            <p>Member since: <span className="text-slate-900 font-bold">{new Date(brand.createdAt).getFullYear()}</span></p>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tight">
            Products from <span className="text-blue-600">{brand.name}</span>
          </h2>
          <p className="text-muted-foreground font-bold">{products.length} Items Found</p>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-[32px]">
            <p className="text-xl font-bold text-muted-foreground italic">
              No products available for this brand at the moment.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}