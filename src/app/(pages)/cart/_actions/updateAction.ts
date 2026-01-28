'use server'
import getUserToken from "@/app/helpers/getUserToken"
import { CartResponse } from "@/interfaces"
export default async function updateCartAction(productId: string, count: number) {
    const token = getUserToken()
    const response = await fetch(
        `${process.env.API_URL}/cart/` + productId,
        {
            method: 'PUT',
            body: JSON.stringify({ count }),
            headers: {
                token: String(token),
                'content-type': 'application/json',
            },
        }
    )
    const data: CartResponse = await response.json()
    return data
}