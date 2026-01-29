import { CategoryI, ProductI } from "@/interfaces"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/productCard/ProductCard"

async function getCategoryProducts(categoryId: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/products?category=${categoryId}`
        )
        if (!response.ok) return [] // لو السيرفر رجع خطأ، رجع مصفوفة فاضية بدل ما يضرب

        const data = await response.json()
        // تأكد إن المسار data.data موجود، وإلا رجع مصفوفة فاضية
        return data?.data || []
    } catch (error) {
        console.error("Fetch Products Error:", error)
        return []
    }
}

export default async function CategoryDetails({
    params,
}: {
    params: Promise<{ categoryId: string }>
}) {
    const { categoryId } = await params

    // يفضل توحيد الـ URLs (تأكد هل الـ API يحتاج /v1/ أم لا)
    const categoryPromise = fetch(`${process.env.API_URL}/v1/categories/${categoryId}`)
    const productsPromise = getCategoryProducts(categoryId)

    const [categoryRes, products] = await Promise.all([categoryPromise, productsPromise])

    // لو مفيش كاتيجوري، اظهر صفحة 404
    if (!categoryRes.ok) notFound()

    const categoryData = await categoryRes.json()
    const category: CategoryI = categoryData?.data

    // حماية إضافية: لو الـ category لسبب ما مش موجود بعد الـ json()
    if (!category) notFound()

    return (
        <main className="container mx-auto py-12 px-4">
            <section className="relative h-75 md:h-100 w-full rounded-[40px] overflow-hidden mb-16 shadow-2xl">
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-10 left-10 space-y-4">
                    <Badge className="bg-blue-600 text-white border-none px-4 py-1 text-sm font-bold uppercase tracking-widest">
                        Category Showcase
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                        {category.name}
                    </h1>
                </div>
            </section>

            <section className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">Available Products</h2>
                        <p className="text-muted-foreground font-medium">Discover items in this collection</p>
                    </div>
                    {/* استخدام Optional Chaining لمنع الـ undefined error */}
                    <Badge variant="outline" className="text-lg px-4 py-1 border-2 font-bold">
                        {(products?.length) || 0} Products
                    </Badge>
                </div>

                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product: ProductI) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border-4 border-dashed rounded-[40px] bg-slate-50">
                        <p className="text-2xl font-black text-slate-400">Empty Collection</p>
                        <p className="text-muted-foreground font-medium">No products found in this category.</p>
                    </div>
                )}
            </section>
        </main>
    )
}