import { ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import React from 'react'
import { Button } from '../ui/button'

export default function EmptyCart() {
    return (
        <div className="container mx-auto py-24 px-4">
            <div className="max-w-md mx-auto text-center space-y-6">
                <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-14 h-14 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">
                        Your cart is empty
                    </h2>
                    <p className="text-muted-foreground italic">
                        Add some products and they’ll show up here.
                    </p>
                </div>
                <Link href="/">
                    <Button className="w-full h-12 text-lg rounded-xl">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Start Shopping
                    </Button>
                </Link>
            </div>
        </div>
    )
}
