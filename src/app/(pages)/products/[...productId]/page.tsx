import { ProductI } from '@/interfaces'
import Mystar from '@/components/ui/mystar'
import { Button } from '@/components/ui/button'
import { HeartIcon, ShoppingBag, CheckCircle2 } from 'lucide-react'
import ProductSlider from '@/components/productSlider/productSlider'
import AddToCart from '@/components/addtoCart/addToCart'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default async function ProductDetails({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params
  const response = await fetch(`${process.env.API_URL}/products/${productId}`)
  const { data: product }: { data: ProductI } = await response.json()
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-card rounded-3xl border shadow-sm p-6 md:p-10">
        <div className="sticky top-24 rounded-2xl overflow-hidden bg-muted">
          <ProductSlider image={product.images} altCont={product.title} />
        </div>
        
        <div className="space-y-6">
          <Badge variant="outline" className="text-blue-600 border-blue-600 text-sm px-3 py-1 font-bold">{product.brand.name}</Badge>
          <h1 className="text-4xl font-black tracking-tight leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-0.5">
               {[1,2,3,4,5].map(s => <Mystar key={s} fill={s <= Math.round(product.ratingsAverage)} className="size-5" />)}
             </div>
             <span className="text-muted-foreground font-medium">({product.ratingsQuantity} Reviews)</span>
          </div>

          <p className="text-4xl font-black text-blue-600">{product.price.toLocaleString()} EGP</p>
          <Separator />
          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
          <Separator />

          <div className="flex gap-4 pt-4">
            <div className="flex-1"><AddToCart productId={product._id} /></div>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-2 hover:text-red-600 hover:bg-red-50">
              <HeartIcon className="size-7" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}