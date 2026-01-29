import { ProductCard } from '@/components/productCard/ProductCard'
import SidebarFilter from '@/components/sideBarFilter/SideBarFilter'
import { ProductI, CategoryI, SubcategoryI } from '@/interfaces'

async function getData(category?: string, subcategory?: string) {
    try {
        let productUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (subcategory) params.append('subcategory', subcategory)
        if (params.toString()) productUrl += `?${params.toString()}`
        const [prodRes, catRes, subRes] = await Promise.all([
            fetch(productUrl),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories`)
        ])
        const products = await prodRes.json()
        const categories = await catRes.json()
        const subcategories = await subRes.json()
        return {
            products: (products?.data || []) as ProductI[],
            categories: (categories?.data || []) as CategoryI[],
            subcategories: (subcategories?.data || []) as SubcategoryI[]
        }
    } catch (error) {
        console.error("Fetch Error:", error)
        return { products: [], categories: [], subcategories: [] }
    }
}
export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; subcategory?: string }>
}) {
    const { category, subcategory } = await searchParams
    const { products, categories, subcategories } = await getData(category, subcategory)
    return (
        <main className="container mx-auto py-10 px-4">
            <div className="flex flex-col lg:flex-row gap-10">
                <SidebarFilter categories={categories} subcategories={subcategories} />
                <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-8 border-b pb-4">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                            {category || subcategory ? 'Filtered Results' : 'All Products'}
                        </h1>
                        <p className="text-muted-foreground font-bold">
                            {products?.length || 0} Items Found
                        </p>
                    </div>
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-4 border-dashed rounded-[40px]">
                            <p className="text-2xl font-black text-muted-foreground italic">
                                No products found for this filter.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}