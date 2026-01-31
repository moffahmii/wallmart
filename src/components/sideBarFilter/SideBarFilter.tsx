'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CategoryI, SubcategoryI } from '@/interfaces'

export default function SidebarFilter({
    categories,
    subcategories
}: {
    categories: CategoryI[],
    subcategories: SubcategoryI[]
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (params.get(key) === value) {
            params.delete(key) 
        } else {
            params.set(key, value)
        }
        router.push(`/products?${params.toString()}`)
    }

    return (
        <aside className="lg:w-64 shrink-0 hidden lg:block space-y-8 sticky top-24 h-fit">
            <div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter italic text-blue-600">Categories</h3>
                <ScrollArea className="h-60 pr-4">
                    <div className="space-y-3">
                        {categories.map((cat) => (
                            <div key={cat._id} className="flex items-center space-x-3 group">
                                <Checkbox
                                    id={cat._id}
                                    checked={searchParams.get('category') === cat._id}
                                    onCheckedChange={() => handleFilter('category', cat._id)}
                                />
                                <label htmlFor={cat._id} className="text-sm font-bold cursor-pointer group-hover:text-blue-600 transition-colors">
                                    {cat.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <Separator />

            <div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter italic text-blue-600">Subcategories</h3>
                <ScrollArea className="h-80 pr-4">
                    <div className="space-y-3">
                        {subcategories.slice(0, 15).map((sub) => (
                            <div key={sub._id} className="flex items-center space-x-3 group">
                                <Checkbox
                                    id={sub._id}
                                    checked={searchParams.get('subcategory') === sub._id}
                                    onCheckedChange={() => handleFilter('subcategory', sub._id)}
                                />
                                <label htmlFor={sub._id} className="text-sm font-semibold text-muted-foreground cursor-pointer group-hover:text-blue-600">
                                    {sub.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </aside>
    )
}