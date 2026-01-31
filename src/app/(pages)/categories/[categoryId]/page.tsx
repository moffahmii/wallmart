import { CategoryI, ProductI } from "@/interfaces"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/productCard/ProductCard"

async function getCategoryProducts(categoryId: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}`
        const response = await fetch(url, { cache: 'no-store' })

        if (!response.ok) return []

        const data = await response.json()
        return data?.data || []
    } catch (error) {
        return []
    }
}

export default async function CategoryDetails({
    params,
}: {
    params: Promise<{ categoryId: string }>
}) {
    const { categoryId } = await params

    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`)

    if (!categoryRes.ok) notFound()

    const categoryData = await categoryRes.json()
    const category: CategoryI = categoryData?.data
    const products = await getCategoryProducts(categoryId)

    if (!category) notFound()

    return (
        <main className="container mx-auto py-12 px-4">
            <section className="relative h-[300px] md:h-[400px] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-xl border border-slate-100">
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-10 left-10 space-y-2">
                    <Badge className="bg-blue-600 text-white border-none px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        Collection
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase italic">
                        {category.name}
                    </h1>
                </div>
            </section>

            <section className="space-y-10">
                <div className="flex items-end justify-between mb-10 border-l-4 border-slate-950 pl-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-950 tracking-tight uppercase">Available Products</h2>
                        <p className="text-slate-500 font-medium">Curated items from {category.name}</p>
                    </div>
                    <Badge variant="outline" className="hidden md:flex text-sm px-4 py-1 border-slate-200 text-slate-500 font-bold rounded-full bg-slate-50">
                        {products.length} Items Found
                    </Badge>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product: ProductI) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50">
                        <div className="bg-white size-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">
                            📦
                        </div>
                        <p className="text-xl font-bold text-slate-900">No products here yet</p>
                        <p className="text-slate-500 font-medium mt-1">Check back soon for new arrivals.</p>
                    </div>
                )}
            </section>
        </main>
    )
}