'use server'
import getUserToken from "@/app/helpers/getUserToken"
export async function addToCartAction(productId: string) {
    const token = await getUserToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`,
        {
            method: 'POST',
            headers: {
                token: token!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
            }),
        })
    const data = await response.json()
    return data
}