import { CategoryI, ProductI } from "@/interfaces"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/productCard/ProductCard"

// دالة لجلب منتجات الكاتيجوري
async function getCategoryProducts(categoryId: string) {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
    )
    const data = await response.json()
    return data.data as ProductI[]
}

export default async function CategoryDetails({
    params,
}: {
    params: Promise<{ categoryId: string }>
}) {
    const { categoryId } = await params

    // طلب البيانات بالتوازي لسرعة التحميل
    const categoryPromise = fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
    const productsPromise = getCategoryProducts(categoryId)

    const [categoryRes, products] = await Promise.all([categoryPromise, productsPromise])

    if (!categoryRes.ok) notFound()

    const { data: category }: { data: CategoryI } = await categoryRes.json()

    return (
        <main className="container mx-auto py-12 px-4">

            {/* --- Category Banner Section --- */}
            <section className="relative h-[300px] md:h-[400px] w-full rounded-[40px] overflow-hidden mb-16 shadow-2xl">
                {/* خلفية الصورة مع Overlay */}
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

                {/* نصوص القسم فوق الصورة */}
                <div className="absolute bottom-10 left-10 space-y-4">
                    <Badge className="bg-blue-600 text-white border-none px-4 py-1 text-sm font-bold uppercase tracking-widest">
                        Category Showcase
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                        {category.name}
                    </h1>
                    <p className="text-gray-300 text-lg font-medium max-w-lg">
                        Explore the best selection of <span className="text-white font-bold">{category.name}</span> curated just for you.
                    </p>
                </div>
            </section>

            {/* --- Products Grid Section --- */}
            <section className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">Available Products</h2>
                        <p className="text-muted-foreground font-medium">Discover items in this collection</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-1 border-2 font-bold">
                        {products.length} Products
                    </Badge>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border-4 border-dashed rounded-[40px] bg-slate-50">
                        <div className="space-y-4">
                            <p className="text-2xl font-black text-slate-400">Empty Collection</p>
                            <p className="text-muted-foreground font-medium">We couldn&apos;t find any products in this category right now.</p>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}